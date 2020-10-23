import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Location} from "@angular/common";
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { saveAs } from 'file-saver';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { ApplicationsService } from '../../services/applications.service';

import { ErrorService } from '../../../shared/errorModal/error.service';

// TODO ::  IMPLEMENT WITH MODALS
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// TODO ::  IMPLEMENT ACCORDION FOR ALL EVENTS TO HIDE FUNCTIONALITY

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  allEvents: Event[];

  constructor(
    private http: HttpClient,
    private eventsService: EventsService,
    private applicationsService: ApplicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents()
    .subscribe(res => {
      this.allEvents = res;
    }, (error) => {
      this.errorService.passError('Error Getting Events!', '/dashboard')
    })
  }

  onStatusClick(eId: string){
    this.eventsService.toggleEventStatus(eId)
    .subscribe(res => {
      //res is the updated event
      let indx = this.allEvents.findIndex(e => e._id === eId);
      this.allEvents[indx].eventActive = res;  //update event in current all events array
    }, (error) => {
      this.errorService.passError('Error Updating Event!', '/dashboard')
    })
  }

  getExcel(eventId: string, team: string){
    // console.log('get excel here');
    this.applicationsService.getEventExcel(eventId)
    .subscribe(res => {
      let fileName = team + '.csv';
      saveAs(res, fileName);
    }, (error) => {
      this.errorService.passError('Error Getting Excel File!', '/dashboard')
    })
  }

  sendAcc(eventId: string, team: string, phase: string){
    let conStr = "Are you sure to send acceptance emails for " + team + " recruitment applicants?"
      + "\n THIS ACTION CAN NOT BE UNDONE";
    if(confirm(conStr)) {
      this.applicationsService.sendAcceptedEmails(eventId, phase)
      .subscribe(res => {
        alert("acceptance emails sent!");
      }, (error) => {
        this.errorService.passError('Error Sending Acceptance Emails!', '/dashboard')
      });
    }
  }

  sendRej(eventId: string, team: string, phase: string){
    let conStr = "Are you sure to send rejected emails for " + team + " recruitment applicants?"
      + "\nWARNING! all applications whose status is anything other than accepted will receive\n"
      + "a rejection email.\n THIS ACTION CAN NOT BE UNDONE";
    // console.log('SEND REJ :: ', eventId, team, phase);
    if(confirm(conStr)) {
      this.applicationsService.sendRejectedEmails(eventId, phase)
      .subscribe(res => {
        alert("rejection emails sent!");
      }, (error) => {
        this.errorService.passError('Error Sending Rejection Emails!', '/dashboard')
      });
    }
  }


  onDeleteEvent(eventId: string) {
    if(!confirm('Are you sure you want to delete this event?')) return;
    this.eventsService.deleteEvent(eventId)
    .subscribe(res => {
      this.allEvents = this.allEvents.filter(ev => ev._id != eventId);
      alert('Event Successfully Deleted!');
    }, error => {
      this.errorService.ErrorCaught.next({ErrorMsg: error.message, Url: '/home'});
    });
  }


  goBack() {
    this.location.back();
  }

}
