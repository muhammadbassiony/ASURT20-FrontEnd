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
import {Location} from "@angular/common";
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { Application} from '../../models/application.model';
import { ApplicationPhase } from '../../models/app-phases-enum.model';
import { ApplicationStatus } from '../../models/app-status-enum.model';

import { ApplicationsService } from "../../services/applications.service";
import { EventsService } from "../../services/events.service";
import { UserService } from '../../../authorization/user.service';

import { pdfMimeType } from './pdf-mime-type.validator';
import {ErrorService} from "../../../shared/errorModal/error.service";

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
    private errorService: ErrorService,
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }


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

      const userAnswers = <FormGroup>this.appForm.get('userAnswers');
      this.eventData.questions.forEach(qs => {
        userAnswers.addControl(qs, new FormControl('', [Validators.required]));
      });

      return this.usersService.getUser(this.userId);
    }))
    .subscribe(res => {
      this.user = res;
    }, (error) => {
      this.errorService.passError('Error Getting User Events Data!', '/dashboard')
    });

  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fileToUpload: File = null;
  onCvSelected(files: FileList){
    this.fileToUpload = files.item(0);
    if(this.fileToUpload.size > 5*1024*1024){
      alert("Pdf maximum size is 5MB");
      this.appForm.get('userCv').setErrors({ 'sizeInvalid' : true });
      return;
    }
    if (this.fileToUpload.type != 'application/pdf') {
      alert("The file must be PDF");
      this.appForm.get('userCv').setErrors({ 'typeInvalid' : true });
      return;
    }
    // if(this.fileToUpload.type !== 'application/pdf'){
    //   alert("Only pdf files are allowed");
    //   this.appForm.get('userCv').setErrors({ 'invalidFormat': true });
    //   return;
    // }

    this.appForm.patchValue({ 'userCV' : this.fileToUpload });
    this.appForm.get("userCV").updateValueAndValidity();
  }

  checkSubValidity(){
    let same = this.appForm.value.selectedSubteam1 === this.appForm.value.selectedSubteam2;
    let touched1 = this.appForm['controls'].selectedSubteam1.touched;
    let touched2 = this.appForm['controls'].selectedSubteam2.touched;
    return same && touched1 && touched2;
  }

  goBack() {
    this.location.back();
  }

  onSubmit(appForm: FormGroup){

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


    this.applicationsService.addNewApplication(this.newApp)
    .pipe(switchMap(res => {
      this.appForm.reset();
      return this.eventsService.incrementNumApplicants(this.eventId); //increment when adding a new cv???
    }))
    .subscribe(res => {
      this.router.navigate(['dashboard']);
    }, (error) => {
      this.errorService.passError('Error Adding New Application!', '/dashboard')
    });

  }

}
