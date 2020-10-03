import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Interview } from '../../../models/interview.model';
import { InterviewStatus } from '../../../models/interview-status-enum.model';

import { InterviewsService } from '../../../services/interviews.service';

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

  keys() : Array<string> {
    var keys = Object.keys(InterviewStatus);
    // console.log(keys);
    // return keys.slice(keys.length/2);
    return keys;
  }

  constructor(
    private interviewsService: InterviewsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.statuses = this.keys();
    this.ivId = this.route.snapshot.paramMap.get('ivId');
    // console.log('RECEIVED ID ::', this.ivId);
    this.interviewsService.getInterview(this.ivId)
    .subscribe(res => {
      this.interview = res;
      this.model = <InterviewStatus>this.interview.extendedProps.ivStatus.toLowerCase();
      // this.app = this.interview.extendedProps.application._id;
      // console.log(this.interview, '\n');
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
      // console.log('INTRV DELETE :: \N', res);
      this.router.navigate(['manage-interviews']);
    });
  }

}
