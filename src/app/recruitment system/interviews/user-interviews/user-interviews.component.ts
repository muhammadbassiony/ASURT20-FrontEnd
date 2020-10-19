import { Component, OnInit } from '@angular/core';
import {FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  RequiredValidator,
  FormArray} from '@angular/forms';


import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Interview } from '../../models/interview.model';
import { InterviewStatus } from '../../models/interview-status-enum.model';
import { InterviewsService } from '../../services/interviews.service';
import { ApplicationsService } from '../../services/applications.service';
import { UserService } from '../../../authorization/user.service';
import {ErrorService} from "../../../shared/errorModal/error.service";

@Component({
  selector: 'app-user-interviews',
  templateUrl: './user-interviews.component.html',
  styleUrls: ['./user-interviews.component.css']
})
export class UserInterviewsComponent implements OnInit {

  // userIvForm: FormGroup;

  avs: any;
  dayFiltered: any = [];
  availableDates: any = [];

  disableTimes = true;

  // currentUserId = "u1";  //get from application
  appId: string;

  selectedDay: string;
  selId: string;

  valid: boolean = false;

  constructor(
    private interviewsService: InterviewsService,
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }

  ngOnInit(): void {
    this.appId = this.route.snapshot.paramMap.get('appId');
    this.disableTimes = true;

    this.interviewsService.getAvailableDates()
    .subscribe(res => {
      this.dayFiltered = res;
      this.avs = res;
      for(let iv of this.dayFiltered){
        if(!this.availableDates.includes(iv.date)){
          this.availableDates.push(iv.date);
        }
      }
    }, error => {
      this.errorService.passError('Error Getting Dates!', '/dashboard');
    });
  }

  getTimes(daySel: string){
    let updatedAvs = [];
    for(let iv of this.avs){
      if(iv.date == daySel){
        updatedAvs.push(iv);
      }
    }
    this.dayFiltered = updatedAvs;
    this.disableTimes = false;
  }

  validate(){
    let nv = this.selId != null;
    let tv = this.selectedDay  != null
    // console.log(nv, tv);
    this.valid = nv && tv;

  }

  onSubmit(){
    let iv;
    this.interviewsService.getInterview(this.selId)
    .pipe(switchMap(res => {
      iv = <Interview>res;
      iv.extendedProps.appId = this.appId;
      iv.extendedProps.ivStatus = InterviewStatus.booked;
      // iv.title = this.
      return this.interviewsService.updateInterview(iv._id, iv);
    }))
    .subscribe(res => {
      this.router.navigate(['dashboard']);
    }, error => {
      this.errorService.passError('Error Getting This Interview', '/dashboard');
    });

  }
  goBack() {
    this.location.back();
  }

}
