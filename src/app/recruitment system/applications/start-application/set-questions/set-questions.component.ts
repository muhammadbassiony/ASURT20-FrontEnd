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
import { map, switchMap, toArray } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Event } from '../../../models/event.model'
import { Team } from '../../../models/team.model';

import { EventsService } from '../../../services/events.service';
import { TeamsService } from '../../../services/teams.service';
import { ApplicationPhase } from '../../../models/app-phases-enum.model';


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

  constructor(private http: HttpClient,
    private fb: FormBuilder, 
    private eventsService: EventsService,
    private teamsService: TeamsService, 
    private route: ActivatedRoute,
    private router: Router) { }

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
      // console.log('setQs get team ::: \n', this.team);
      const activeSubs = <FormGroup>this.questionsForm.get('activeSubs');
      this.team.subteams.forEach(sub => {
        activeSubs.addControl(sub._id, new FormControl(true));
      });
      // console.log(this.questionsForm);
    });

    
  }

  onAddQuestion() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.questionsForm.get('questions')).push(control);
  }

  onRemoveQuestion(indx: number){
    (<FormArray>this.questionsForm.get('questions')).removeAt(indx);
  }

  onSubmit(questionsForm: FormGroup){
    // console.log(this.eventData);
    // console.log(questionsForm, this.model);
    this.eventData.questions = []; //reset
    for(var i in this.questionsForm.value.questions){
      this.eventData.questions.push(this.questionsForm.value.questions[i]);
    }
    // console.log(this.eventData);

    let newSubs = [];
    for(let j of this.team.subteams){
      // console.log(j, this.questionsForm.value.activeSubs[j._id]);
      if(this.questionsForm.value.activeSubs[j._id]){
        newSubs.push(j._id);
      }
    }    
    this.eventData.activeSubteams = newSubs;
    this.eventData.eventActive = true; //activate here
    this.eventData.currentPhase = this.model;
    // console.log(this.eventData);

    this.eventsService.updateEvent(this.eventId, this.eventData)
    .subscribe(res => {
      // console.log('setQs final:: \n', res);
      this.questionsForm.reset();  // reset AFTER data saved or redirect and dont reset at all
      this.router.navigate(['dashboard']);
    });

    
  }
  

}
