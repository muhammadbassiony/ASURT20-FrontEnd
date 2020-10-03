import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { ApplicationsService } from '../../services/applications.service';
import { UserService } from '../../../authorization/user.service';
import { Application } from '../../models/application.model';

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
    private applicationsService: ApplicationsService, 
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this should be passed to the dashboard component as a param after login using next line
    // this.userId = this.route.snapshot.queryParamMap.get('userId');
    // this.userId = "5f5b7283b4adb51dec72e8ed"; // for testing 

    this.applicationsService.getUserEvents(this.userId)
    .pipe(switchMap(res => {
      this.appliedTo = res['appliedTo'];
      this.didntApply = res['didntApply'];
      // console.log('herio mate\n', this.appliedTo, this.didntApply);
      return this.applicationsService.getUserApps(this.userId);
    }))
    .subscribe(res => {
      this.userApps = res; //getting the user apps as appliedTo contains events only
      // didntApply := user doesnt have apps to those duh!
      // console.log('resss ::\n', this.userApps);
    });

    
    
  }
    

}
