import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { saveAs } from 'file-saver';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { ApplicationsService } from '../../services/applications.service';

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
    private router: Router) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents()
    .subscribe(res => {
      // console.log('admin evs ::\n', res);
      this.allEvents = res;
    })
  }

  onStatusClick(eId: string){
    this.eventsService.toggleEventStatus(eId)
    .subscribe(res => {
      //res is the updated event 
      let indx = this.allEvents.findIndex(e => e._id === eId);
      this.allEvents[indx] = <Event>res;  //update event in current all events array
    })
  }

  getExcel(eventId: string, team: string){
    // console.log('get excel here');
    this.applicationsService.getEventExcel(eventId)
    .subscribe(res => {
      // console.log('recieved file :: \n', res);
      let fileName = team + '.csv';
      saveAs(res, fileName);

      // const link = document.createElement('a');
      // link.setAttribute('target', '_self');
      // link.setAttribute('href', 'file://///'+res);
      // // link.setAttribute('download', `products.csv`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    })
  }

  sendAcc(eventId: string, team: string, phase: string){
    let conStr = "Are you sure to send acceptance emails for " + team + " recruitment applicants?" 
      + "\n THIS ACTION CAN NOT BE UNDONE";
    if(confirm(conStr)) {
      this.applicationsService.sendAcceptedEmails(eventId, phase)
      .subscribe(res => {
        console.log('acceptance emails sent!\n', res);
        alert("acceptance emails sent!");
      });
    }
  }

  sendRej(eventId: string, team: string, phase: string){
    let conStr = "Are you sure to send rejected emails for " + team + " recruitment applicants?" 
      + "\nWARNING! all applications whose status is anything other than accepted will receive\n" 
      + "a rejection email.\n THIS ACTION CAN NOT BE UNDONE";
    if(confirm(conStr)) {
      this.applicationsService.sendRejectedEmails(eventId, phase)
      .subscribe(res => {
        console.log('rejection emails sent!\n', res);
        alert("rejection emails sent!");
      });
    }
  }

}
