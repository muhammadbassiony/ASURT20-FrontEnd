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
import {Location} from "@angular/common";
import { map, switchMap, toArray } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Event } from '../../../models/event.model'
import { Team } from '../../../models/team.model';

import { EventsService } from '../../../services/events.service';
import { TeamsService } from '../../../services/teams.service';
import { ApplicationPhase } from '../../../models/app-phases-enum.model';
import {ErrorService} from "../../../../shared/errorModal/error.service";


@Component({
  selector: 'app-set-questions',
  templateUrl: './set-questions.component.html',
  styleUrls: ['./set-questions.component.css']
})
export class SetQuestionsComponent implements OnInit {

  eventId: string;
  eventData: any;
  team: any;  //populated subteam so cant cast to team model
  phases: string[];
  model = ApplicationPhase.screening;

  questionsForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }

    keys() : Array<string> {
      var keys = Object.values(ApplicationPhase);
      // console.log(keys);
      // return keys.slice(keys.length/2);
      return keys;
    }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.queryParamMap.get('eventId');
    this.phases = this.keys();

    this.questionsForm = this.fb.group({
      'phase': [ '', Validators.required],
      'activeSubs': this.fb.group({}),
      'questions': this.fb.array([])
    });

    this.eventsService.getEvent(this.eventId)
    .pipe(switchMap(res => {
      this.eventData = <Event>res;
      this.eventData.questions.forEach(qs => {
        const control = new FormControl(qs, Validators.required);
        (<FormArray>this.questionsForm.get('questions')).push(control);
      });
      this.model = <ApplicationPhase>this.eventData.currentPhase;
      this.questionsForm.patchValue({phase: this.eventData.currentPhase});
      return this.teamsService.getTeam(this.eventData.team._id);
    }))
    .subscribe((res) => {
      this.team = res;
      const activeSubs = <FormGroup>this.questionsForm.get('activeSubs');
      this.team.subteams.forEach(sub => {
        activeSubs.addControl(sub._id, new FormControl(true));
      });
      // console.log(this.questionsForm);
    }, (error) => {
      this.errorService.passError('Error Getting All Teams!', '/dashboard');
    });

    console.log('MODEL PHASSSE TECH??? ', this.model != 'TECH_MISSION')
  }

  onAddQuestion() {
    console.log('MODEL PHASSSE TECH??? ', this.model != 'TECH_MISSION')
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.questionsForm.get('questions')).push(control);
  }

  onRemoveQuestion(indx: number){
    (<FormArray>this.questionsForm.get('questions')).removeAt(indx);
  }

  onSubmit(questionsForm: FormGroup){
    this.eventData.questions = []; //reset
    for(var i in this.questionsForm.value.questions){
      this.eventData.questions.push(this.questionsForm.value.questions[i]);
    }

    let newSubs = [];
    for(let j of this.team.subteams){
      if(this.questionsForm.value.activeSubs[j._id]){
        newSubs.push(j._id);
      }
    }
    this.eventData.activeSubteams = newSubs;
    this.eventData.eventActive = true; //activate here
    this.eventData.currentPhase = this.model;

    this.eventsService.updateEvent(this.eventId, this.eventData)
    .subscribe(res => {
      this.questionsForm.reset();  // reset AFTER data saved or redirect and dont reset at all
      this.router.navigate(['dashboard']);
    }, (error) => {
      this.errorService.passError('Error Updating Questions!', '/dashboard');
    });


  }
  goBack() {
    this.location.back();
  }

}
