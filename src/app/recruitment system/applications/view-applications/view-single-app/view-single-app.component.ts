import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  RequiredValidator,
  FormArray
} from '@angular/forms'; //why do we need forms here? 


import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ApplicationStatus } from '../../../models/app-status-enum.model'
import { ApplicationPhase } from '../../../models/app-phases-enum.model'

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { User } from '../../../../authorization/user.model';
import { Application } from '../../../models/application.model';
import { Event } from '../../../models/event.model';

import { UserService } from '../../../../authorization/user.service';
import { ApplicationsService } from '../../../services/applications.service';
import { EventsService } from '../../../services/events.service';
import { Team } from '../../../models/team.model';

import { environment } from '../../../../../environments/environment';
// const backend_uri = environment.backend_uri;

@Component({
  selector: 'app-view-single-app',
  templateUrl: './view-single-app.component.html',
  styleUrls: ['./view-single-app.component.css']
})
export class ViewSingleAppComponent implements OnInit {

  backend_uri = environment.backend_uri_static;
  appId: string;
  viewAppForm: FormGroup;
  questions: any[];
  app: any;
  user: any;
  team: Team;
  phases: string[];
  statuses: string[];
  pdfSRC : string;

  @ViewChild('viewSingleAppForm') singleAppFormDirective;
  constructor(
    private applicationsService: ApplicationsService,
    private usersService: UserService,
    private eventsService: EventsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location) {

  }


  keysPhases(): Array<string> {
    var keys = Object.values(ApplicationPhase);
    return keys;
  }
  keysStatus(): Array<string> {
    var keys = Object.values(ApplicationStatus);
    return keys;
  }


  ngOnInit(): void {
    this.phases = this.keysPhases();
    this.statuses = this.keysStatus();
    this.appId = this.route.snapshot.paramMap.get('appId');

    this.applicationsService.getApplication(this.appId)
      .subscribe(res => {
        // this.singleAppFormDirective.resetForm();
        // console.log('fetched user\'s app! ::\n', res);
        this.app = res;
        this.user = this.app.user;
        this.questions = this.app.userAnswers;
        this.pdfSRC = this.backend_uri + this.app.cvPath;
        
        this.viewAppForm = new FormGroup({
          applicationPhase: new FormControl(this.app.currentPhase),
          applicationStatus:new FormControl(this.app.currentPhaseStatus)
        })
       
      });

  }

  downloadCV(){
    window.open(this.pdfSRC);
  }

  updateStatus() {
    this.statuses = this.keysStatus();
  }



  onSubmit(){
    // console.log('SUBMITT :: \n', this.app);
    var newApp : Application = {
      userId:this.user._id,
      eventId: this.app.event._id,
      selectedSubteam1: this.app.selSubteam1._id,
      selectedSubteam2: this.app.selSubteam2._id,
      userCV:this.app.cvPath,
      userAnswers:this.app.userAnswers,
      season: this.app.season,
      currentPhase:this.app.currentPhase,
      currentPhaseStatus:this.app.currentPhaseStatus,
      cvPath: this.app.cvPath
    }
    
    this.applicationsService.updateApp(this.app._id, newApp)
      .subscribe(res=> {
        alert("Application successfully updated in Database!")
      });
  }

  goBack(): void {
    this.location.back();
  }


}
