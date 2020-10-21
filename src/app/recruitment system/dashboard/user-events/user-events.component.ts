import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { map, switchMap, concatMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { ApplicationsService } from '../../services/applications.service';
import { InterviewsService } from '../../services/interviews.service';
import { UserService } from '../../../authorization/user.service';
import { Application } from '../../models/application.model';
import {ErrorService} from "../../../shared/errorModal/error.service";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {

  allEvents: Event[];

  // userId: string;
  userApps: any;
  // modEvents = [];
  appliedTo: any;
  didntApply: any;

  @Input('userId') userId: string;

  constructor(
    private eventsService: EventsService,
    private errorService: ErrorService,
    private applicationsService: ApplicationsService,
    private interviewsService: InterviewsService,
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {

    this.applicationsService.getUserEvents(this.userId)
    .pipe(concatMap(res => {
      this.appliedTo = res['appliedTo'];
      this.didntApply = res['didntApply'];
      console.log('USER EVENTS APPLIED TO AND DIDNT APPLY TO \n', this.appliedTo, this.didntApply);

      return this.applicationsService.getUserApps(this.userId);
    }))
    .subscribe(res => {

      for(let app of res){
        this.interviewsService.getAppInterviews(app._id)
        .subscribe(res => {
          app.interview = res;
        })
      }
      this.userApps = res;
    }, (error) => {
      this.errorService.passError('Error Getting Interviews!', '/dashboard')
    });
  }


  goBack() {
    this.location.back();
  }

}
