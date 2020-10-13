import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, 
    FormControl, 
    FormGroup, 
    Validators, 
    ReactiveFormsModule, 
    RequiredValidator, 
    FormArray} from '@angular/forms';

    
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Application} from '../../models/application.model';
import { ApplicationPhase } from '../../models/app-phases-enum.model';
import { ApplicationStatus } from '../../models/app-status-enum.model';

import { ApplicationsService } from "../../services/applications.service";
import { EventsService } from "../../services/events.service";
import { UserService } from '../../../authorization/user.service';

import { pdfMimeType } from './pdf-mime-type.validator';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css']
})
export class UserApplicationComponent implements OnInit {
  
  newApp: Application;

  appForm: FormGroup;
  userAnswers: FormGroup;
  
  eventId: string;
  userId: string;

  eventData: any;
  user: any;
  team: any;

  constructor(
    private fb: FormBuilder, 
    private applicationsService: ApplicationsService,
    private eventsService: EventsService,
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.appForm = this.fb.group({
      'selectedSubteam1': [ , [Validators.required]],   
      'selectedSubteam2': [ , [Validators.required]],
      'userCV': [ , [Validators.required], [pdfMimeType]],
      'userAnswers': this.fb.group({})
    });
    

    this.eventsService.getEvent(this.eventId)
    .pipe(switchMap(res => {
      this.eventData = res;
      this.team = res['team'];
      console.log('fetched event:: \n', this.eventData, '\nteam ::\n', this.team);

      const userAnswers = <FormGroup>this.appForm.get('userAnswers');
      this.eventData.questions.forEach(qs => {
        userAnswers.addControl(qs, new FormControl('', [Validators.required, Validators.minLength(15)]));
      });
      
      return this.usersService.getUser(this.userId);
    }))
    .subscribe(res => {
      this.user = res;
      // console.log('fetched user:: \n', this.user);
    });

  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fileToUpload: File = null;
  onCvSelected(files: FileList){
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    if(this.fileToUpload.size > 5*1024*1024){
      alert("Pdf maximum size is 5MB");
      this.appForm.get('userCv').setErrors({ 'sizeInvalid' : true });
      return;
    }
    // if(this.fileToUpload.type !== 'application/pdf'){
    //   alert("Only pdf files are allowed");
    //   this.appForm.get('userCv').setErrors({ 'invalidFormat': true });
    //   return;
    // }

    this.appForm.patchValue({ 'userCV' : this.fileToUpload });
    this.appForm.get("userCV").updateValueAndValidity();
    // console.log('USER APP FORM ::\n', this.appForm);
  }

  checkSubValidity(){
    let same = this.appForm.value.selectedSubteam1 === this.appForm.value.selectedSubteam2;
    let touched1 = this.appForm['controls'].selectedSubteam1.touched;
    let touched2 = this.appForm['controls'].selectedSubteam2.touched;
    return same && touched1 && touched2;
  }


  onSubmit(appForm: FormGroup){
    // console.log(appForm.value);

    let answers: any = [];
    for(let i in this.appForm.value.userAnswers){
      let question = i;
      let answer = this.appForm.value.userAnswers[i];
      answers.push({ question, answer });
    }

    this.newApp = {
      userId: this.userId,
      eventId: this.eventId,
      userCV: this.appForm.value.userCV,
      season: this.eventData.season,
      selectedSubteam1: this.appForm.value.selectedSubteam1._id,
      selectedSubteam2: this.appForm.value.selectedSubteam2._id,
      userAnswers: answers,
      currentPhase: ApplicationPhase.screening,
      currentPhaseStatus: ApplicationStatus.pending
    };

    // console.log('NEW APP BEFORE SUBMIT::\n', this.newApp);

    this.applicationsService.addNewApplication(this.newApp)
    .pipe(switchMap(res => {
      // console.log('NEW APP AFTER SUBMIT::\n', res);
      this.appForm.reset();
      return this.eventsService.incrementNumApplicants(this.eventId); //increment when adding a new cv???
    }))
    .subscribe(res => {
      // console.log('INCREMENT NUM APPLICANTS FOR EVENT::\n', res);
      this.router.navigate(['dashboard']);
    });

  }

}
