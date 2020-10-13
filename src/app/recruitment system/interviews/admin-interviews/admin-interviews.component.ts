import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent, CalendarOptions, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';


import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {Location} from "@angular/common";
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Interview } from '../../models/interview.model';
import { InterviewStatus } from '../../models/interview-status-enum.model';

import { InterviewsService } from '../../services/interviews.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-admin-interviews',
  templateUrl: './admin-interviews.component.html',
  styleUrls: ['./admin-interviews.component.css']
})
export class AdminInterviewsComponent implements OnInit {

  eventId: string;

  calendarOptions: CalendarOptions;
  eventsModel: any;

  eventIntrvs: any;
  event: any;


  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(
    private interviewsService: InterviewsService,
    private eventsService: EventsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location)
    {
      const name = Calendar.name;
    }


  ngOnInit() {
    // this.eventId = this.route.snapshot.paramMap.get('eventId');

    this.calendarInit();

    this.interviewsService.getAllInterviews()
    .subscribe(res => {
      this.eventIntrvs = res;
      this.calendarOptions.events = this.eventIntrvs;
      // console.log('recieved intrvs ::: \n', this.eventIntrvs);
    });

  }

  calendarInit(){
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin]
    };

    this.calendarOptions.editable = true;

    this.calendarOptions.headerToolbar = {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    this.calendarOptions.validRange = {
      //set dynamically according to recieved Recruitment event interviews range
      start: '2020-08-12',
      end: '2023-05-29'
    };
    this.calendarOptions.navLinks = true;
    this.calendarOptions.height = 1140;

    //set dynamically later?
    this.calendarOptions.slotDuration = '00:15:00';
    this.calendarOptions.slotMinTime = '08:00:00';
    this.calendarOptions.slotMaxTime = '20:30:00';

    this.calendarOptions.selectable = true;
    this.calendarOptions.selectMirror = true;
    this.calendarOptions.selectOverlap = true;

    this.calendarOptions.nowIndicator = true;
    this.calendarOptions.editable = false;

    this.calendarOptions.eventBorderColor = '#ffffff';

    this.calendarOptions.dateClick = this.handleDateClick.bind(this);
    this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    this.calendarOptions.eventDragStop = this.handleEventDragStop.bind(this);

    // this.calendarOptions.events = this.interviewsService.getAllInterviews();
    // this.calendarOptions.events = [
    //   { title: 'event 1', date: '2020-08-25', backgroundColor: 'red' },
    //   { title: 'event 2', date: '2020-08-20', backgroundColor: 'yellow' }
    // ];


    this.calendarOptions.select = this.addNewSlot.bind(this);
    // this.calendarOptions.eventsSet = (x) => {
    //   console.log("xx\n", x);
    // };


    this.calendarOptions.eventAdd = (x) => {
      // console.log("eventAdd",x);
    };

  }

  getDiffInMinutes(start: Date, end: Date){
    let diff = Date.parse(end.toUTCString())-Date.parse(start.toUTCString());
    diff = diff / 60000;
    return diff;
  }

  addNewSlot(selectInfo: DateSelectArg){
    console.log(typeof(selectInfo), selectInfo);
    const calendarApi = selectInfo.view.calendar;

    let start = new Date(selectInfo.start);
    let end = new Date(selectInfo.end);
    if(this.getDiffInMinutes(start, end) != 45){
      return false;
    }
    // console.log(selectInfo.startStr, '\n',selectInfo.endStr,  '\n',
    //   selectInfo.allDay, '\n', selectInfo.start, '\n', selectInfo.end);

    let newIntrv = {
      start: new Date(selectInfo.startStr),
      end: new Date(selectInfo.endStr),
      title: "Empty Slot",
      url: "",
      backgroundColor: "",
      eventId: null
      // extendedProps: {
      //     ivStatus: InterviewStatus.scheduled,
      //     appId: null,
      //     eventId: null
      // }
    };

    // calendarApi.addEvent(newIntrv);
    // console.log('addnew slot here');
    this.interviewsService.addNewInterview(newIntrv)
    .subscribe(res => {
      calendarApi.addEvent(res);
      // console.log('intrv booked in backend :: ', res);
      // let url = '/interview/' + res._id;
      // console.log('ROUTE ::', url);
    });

  }

  handleDateClick(arg) {
    // console.log(" handleDateClick", arg);
  }

  handleEventClick(arg) {
    // console.log(" handleEventClick", arg);
  }

  handleEventDragStop(arg) {
    // console.log("handleEventDragStop", arg);
  }

  // updateHeader() {
  //   this.calendarOptions.headerToolbar = {
  //     left: 'prev,next myCustomButton',
  //     center: 'title',
  //     right: ''
  //   };
  // }

  // updateEvents() {
  //   const nowDate = new Date();
  //   const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

  //   this.calendarOptions.events = [{
  //     title: 'Updaten Event',
  //     start: yearMonth + '-08',
  //     end: yearMonth + '-10'
  //   }];
  // }

  goBack(): void {
    this.location.back();
  }
}
