import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/application.model';
import { ApplicationsService } from '../../../services/applications.service';
import { UserService } from '../../../../authorization/user.service';
import { EventsService } from '../../../services/events.service';
import {ViewSingleAppComponent}  from '../view-single-app/view-single-app.component'


import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Location} from "@angular/common";
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { ApplicationPhase } from '../../../models/app-phases-enum.model';
import { ApplicationStatus } from '../../../models/app-status-enum.model';
import {ErrorService} from "../../../../shared/errorModal/error.service";


@Component({
  selector: 'app-view-all-apps',
  templateUrl: './view-all-apps.component.html',
  styleUrls: ['./view-all-apps.component.css']
})
export class ViewAllAppsComponent implements OnInit {

  // eventId = "firstEvent";
  eventId: string;
  event: any;
  // eventName: string;

  allApps: any = null;
  filteredItems: any[] = null;
  // appUsers = [];
  query: string; //search query -- dont remove

  gradYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  gradYr ;

  statuses: any;
  phases: any;
  queryStatus;
  queryPhase;
  querySubteam;

  constructor(
    private applicationsService: ApplicationsService,
    private usersService: UserService,
    private eventsService: EventsService,
    private errorService: ErrorService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

    keysPhases(): Array<string> {
      var keys = Object.values(ApplicationPhase);
      return keys;
    }
    keysStatus(): Array<string> {
      var keys = Object.values(ApplicationStatus);
      return keys;
    }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.phases = this.keysPhases();
    this.statuses = this.keysStatus();


    this.eventsService.getEvent(this.eventId)
    .pipe(switchMap(res => {
      this.event = res;
      return this.applicationsService.getEventApps(this.eventId);
    }))
    .subscribe(res => {
      this.allApps = res;
      this.assignCopy();//when you fetch collection from server.
    }, (error) => {
      this.errorService.passError('Error Getting Events!', '/dashboard')
    });

  }



  assignCopy(){
    this.filteredItems = Object.assign([], this.allApps);
  }

  filterItem(value: string){
    if(value===""){
      this.assignCopy();
    } // when nothing has typed
    else{
      this.filteredItems = Object.assign([], this.allApps).filter(
        item => (item.user.name.toLowerCase().indexOf(value.toLowerCase()) > -1  ||
          item.user.email.toLowerCase().indexOf(value.toLowerCase()) > -1)
      );
    }
  }


  filter(){
    this.filteredItems = Object.assign([], this.allApps)
      .filter(app => (this.queryStatus? app.currentPhaseStatus == this.queryStatus : true) &&
        (this.queryPhase? app.currentPhase == this.queryPhase : true) &&
        (this.gradYr? app.user.graduationYear == this.gradYr : true) &&
        (this.querySubteam ? (app.selSubteam1._id == this.querySubteam || app.selSubteam2._id == this.querySubteam) : true ) );

  }


  goBack(): void {
    this.location.back();
  }
}
