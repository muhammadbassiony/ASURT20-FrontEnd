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

  allApps: any;
  filteredItems: any[];
  // appUsers = [];
  query: string; //search query -- dont remove

  gradYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  gradYr: number;

  statuses: any;
  phases: any;
  queryStatus: any;
  queryPhase: any;

  constructor(
    private applicationsService: ApplicationsService,
    private usersService: UserService,
    private eventsService: EventsService,
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

    // this.gradYears.forEach(y =>  console.log('YR :: ', y));

    this.eventsService.getEvent(this.eventId)
    .pipe(switchMap(res => {
      console.log('fetched the event itself ::', res);
      this.event = res;
      return this.applicationsService.getEventApps(this.eventId);
    }))
    .subscribe(res => {
      console.log('recieved event apps ::\n', res);
      this.allApps = res;
      this.assignCopy();//when you fetch collection from server.
      console.log("the filtered Items", this.filteredItems);
    });

  }

  update():void{

  }
  

  assignCopy(){
    this.filteredItems = Object.assign([], this.allApps);
  }

  filterItem(value){
    if(value===""){
      this.assignCopy();
      console.log("the filtered Items", this.filteredItems);
    } // when nothing has typed
    else{
      this.filteredItems = Object.assign([], this.allApps).filter(
      item => (item.user.name.toLowerCase().indexOf(value.toLowerCase()) > -1  || item.user.email.toLowerCase().indexOf(value.toLowerCase()) > -1)

      )
    }
  }


  filterGradYear(){
    console.log('FILTER GRAD :: ', this.gradYr);
  }


  filterAppPhase(){
    console.log('FILTER PHASE :: ', this.queryPhase);
  }


  filterAppStatus(){
    console.log('FILTER STATUS :: ', this.queryStatus);
  }


  goBack(): void {
    this.location.back();
  }
}
