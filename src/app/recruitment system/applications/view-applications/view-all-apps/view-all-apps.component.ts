import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationsService } from 'src/app/services/applications.service';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import {ViewSingleAppComponent}  from '../view-single-app/view-single-app.component'
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';


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

  constructor(
    private applicationsService: ApplicationsService, 
    private usersService: UsersService,
    private eventsService: EventsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    
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

    // this.allApplications = this.applicationsService
    //   .getAllApplications()
    //   .filter(app => app.eventId === this.eventId);
    
    // for(let i=0; i<this.allApplications.length; i++){
    //   this.appUsers.push({
    //     ...this.allApplications[i],
    //     ...(this.usersService.getUser(this.allApplications[i].userId))
    //   });
    // }
    // console.log("merged",this.appUsers);
  }
  update():void{
    
  }
  // getUser(userId: string){
  //   return this.usersService.getUser(userId);
  // }
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
  }