import { Component, OnInit } from '@angular/core';
import {FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  RequiredValidator, 
  FormArray} from '@angular/forms';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { take } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { AuthUser } from '../authUser.model';
import { User } from '../user.model';

import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  model: NgbDateStruct;

  isLoading = false;
  userId: string;
  profileForm: FormGroup;
  authUser: AuthUser;
  user: User;

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.authUser
    .pipe(switchMap(res => {
      this.authUser = res;
      this.userId = this.authUser._id;
      console.log('EDIT-PROFILE :: AUTHUSER :: \n', this.authUser, this.userId);
      return this.usersService.getUser(this.userId);
    }))
    .subscribe(res => {
      this.user = res;
      console.log('GOTTEN THEM USEERAAR :: \n', this.user);
    })
    // console.log('EDIT PROFILE USERID :: ', );

    this.profileForm = this.fb.group({
      'name': [ , [Validators.required, Validators.minLength(8)]], 
      'mobile': [ , [Validators.required, Validators.pattern("[0-9 ]{11}")]], 
      'gender': [ , [Validators.required]], 
      'birthDate': [ , [Validators.required]], 
      'university': [ , [Validators.required, Validators.minLength(3)]], 
      'faculty': [ , [Validators.required]], 
      'department': [ , [Validators.required]], 
      'gradYear': [ , [Validators.required, Validators.minLength(4)]], 
      'credit': [ , [Validators.required]], 
      'collegeId': [ , [Validators.required, Validators.minLength(4)]], 
      'emrgName': [ , [Validators.required]], 
      'emrgMobile': [ , [Validators.required, Validators.pattern("[0-9 ]{11}")]], 
      'emrgRelation': [ , [Validators.required]] 
    });
  }

  onSubmit(profileForm: FormGroup){
    console.log('EDIT PROFILE FORM :: \n', this.profileForm);
    this.user = {...this.user, ...this.profileForm.value};
    let ngbDate = this.profileForm.value.birthDate;
    this.user.birthDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
    console.log('USERRRRRR FROM FORM :: \n', this.user);

    this.usersService.addUserInfo(this.userId, this.user)
    .subscribe(res => {
      console.log('ADDED DEM INFOOOO :: \n', res);
    })
    // this.usersService.authUser.next(this.authUser);
    // this.router.navigate(['dashboard']);
  }
}
