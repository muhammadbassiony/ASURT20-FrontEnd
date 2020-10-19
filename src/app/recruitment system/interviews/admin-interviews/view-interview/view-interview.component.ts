import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {Location} from "@angular/common";
import { map, switchMap } from 'rxjs/operators';
import { from, Observable, pipe, Subscription } from 'rxjs';

import { Interview } from '../../../models/interview.model';
import { InterviewStatus } from '../../../models/interview-status-enum.model';

import { InterviewsService } from '../../../services/interviews.service';

import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component'
import {ErrorService} from "../../../../shared/errorModal/error.service";

@Component({
  selector: 'app-view-interview',
  templateUrl: './view-interview.component.html',
  styleUrls: ['./view-interview.component.css']
})
export class ViewInterviewComponent implements OnInit {

  model = InterviewStatus.scheduled;
  statuses: string[];
  ivId: string;
  interview: any;
  app: string;
  isLoading = true;

  keys() : Array<string> {
    var keys = Object.keys(InterviewStatus);
    return keys;
  }

  constructor(
    private interviewsService: InterviewsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }

  ngOnInit() {

    this.ivId = this.route.snapshot.paramMap.get('ivId');
    // this.model = null;
    // this.ivId = '5f7e6ce69992872008f4bb34';
    this.interviewsService.getInterview(this.ivId)
    .subscribe(res => {
      this.interview = res;
      this.model = <InterviewStatus>this.interview.extendedProps.ivStatus.toLowerCase();
      this.statuses = this.keys();
      this.isLoading = false;
      // this.app = this.interview.extendedProps.application._id;

    }, error => {
      this.errorService.passError('Error Getting Interview!', '/dashboard')
    })

  }

  onSubmit(){
    this.interview.extendedProps.ivStatus = <InterviewStatus>this.model;
    this.interviewsService.updateInterview(this.ivId, this.interview)
    .subscribe(res => {
      this.router.navigate(['manage-interviews']);
    }, error => {
      this.errorService.passError('Error Updating Interview!', '/dashboard')
    });
  }

  deleteInterview(){
    this.interviewsService.deleteInterview(this.ivId)
    .subscribe(res => {
      this.router.navigate(['manage-interviews']);
    }, error => {
      this.errorService.passError('Error Deleting Interview', '/dashboard')
    });
  }
  goBack() {
    this.location.back();
  }

}
