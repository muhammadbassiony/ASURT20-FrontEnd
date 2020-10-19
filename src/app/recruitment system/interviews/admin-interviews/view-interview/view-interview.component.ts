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
    private location: Location) { }

  ngOnInit() {
    console.log('VIEW SINGLE IV HEREEEE :: \n\n');

    this.ivId = this.route.snapshot.paramMap.get('ivId');
    // console.log('RECEIVED ID ::', this.ivId);
    // this.model = null;
    // this.ivId = '5f7e6ce69992872008f4bb34';
    this.interviewsService.getInterview(this.ivId)
    .subscribe(res => {
      // console.log('RECEIVED IV FROM BAKEND :: \n', res);
      this.interview = res;
      this.model = <InterviewStatus>this.interview.extendedProps.ivStatus.toLowerCase();
      // console.log('MODELLLL NEWWW :: \n', this.model);
      this.statuses = this.keys();
      // console.log('STATUSESSSS \n', this.statuses);
      this.isLoading = false;
      // this.app = this.interview.extendedProps.application._id;
      // console.log('THIS . INTERVIEW', this.interview);
      // console.log(this.interview.extendedProps.application)

    })

  }

  onSubmit(){
    this.interview.extendedProps.ivStatus = <InterviewStatus>this.model;
    this.interviewsService.updateInterview(this.ivId, this.interview)
    .subscribe(res => {
      // console.log('RESS\n', res);
      this.router.navigate(['manage-interviews']);
    });
  }

  deleteInterview(){
    this.interviewsService.deleteInterview(this.ivId)
    .subscribe(res => {
      // console.log('INTRV DELETE :: \n', res);
      this.router.navigate(['manage-interviews']);
    });
  }
  goBack() {
    this.location.back();
  }

}
