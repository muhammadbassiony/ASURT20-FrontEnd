import { Component, OnInit } from '@angular/core';
import {FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  RequiredValidator, 
  FormArray} from '@angular/forms'; 

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { Event } from '../../../models/event.model'
import { Team } from '../../../models/team.model';
import { Seasons } from '../../../models/seasons.model';

import { EventsService } from '../../../services/events.service';
import { TeamsService } from '../../../services/teams.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  teams: Team[];
  newEvent: Event;
  newEventForm: FormGroup;
  seasons: string[];

  constructor(private http: HttpClient, 
    private fb: FormBuilder, 
    private teamsService: TeamsService, 
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router) { }

    keys() : Array<string> {
      var keys = Object.keys(Seasons);
      return keys.slice(keys.length / 2);
    }

  ngOnInit(): void {
    this.seasons = this.keys();

    this.teamsService.getAllTeams()
    .subscribe((res) => {
      this.teams = res;
    });

    this.newEventForm = this.fb.group({
      'eventTeam': [],
      'season': []
    });
  }

  onSubmit(newEventForm: FormGroup){
    // console.log("onsubmit here\n", this.newEventForm.value.eventTeam);
    

    let teamId = this.newEventForm.value.eventTeam._id;
    let season = this.newEventForm.value.season;
    this.newEvent = {
      teamId: teamId,
      season: season,
      eventActive: false,
      questions:[]
    };

    this.eventsService.addNewEvent(this.newEvent)
    .subscribe(event => {
      // console.log('evennnnnt :::  ', event);  //returned created event with _id field
      this.router.navigate(
        ['application', 'set-questions'], 
        { queryParams: { eventId: event['_id'] }
      });
      // return event;
    });

  }


  cancel(){
    //remove all data and go back to dashboard here
  }

}
