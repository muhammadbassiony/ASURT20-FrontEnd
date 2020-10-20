import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  RequiredValidator,
  FormArray
} from '@angular/forms';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { take } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { AuthUser } from '../authUser.model';
import { User } from '../user.model';

import { UserService } from '../user.service';

import { EditProfileDeactivateGuard } from './edit-profile-can-deactivate.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, EditProfileDeactivateGuard {

  model: NgbDateStruct;

  isLoading = false;
  userId: string;
  profileForm: FormGroup;
  authUser: AuthUser;
  user: User;

  completedProfile = false;

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
      // console.log('EDIT-PROFILE :: AUTHUSER :: \n', this.authUser, this.userId);
      return this.usersService.getUser(this.userId);
    }))
    .subscribe(res => {
      this.user = res;

      for(let i in this.user){
        if(this.profileForm.get(i)){
          this.profileForm.get(i).patchValue(this.user[i]);
        }
      }

      let date = new Date(this.user.birthDate);
      this.model = this.user.birthDate ?
        { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()} : null;

    })


    this.profileForm = this.fb.group({
      'name': [ , [Validators.required, Validators.minLength(8)]],
      'mobile': [ , [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      'gender': [ , [Validators.required]],
      'birthDate': [ , [Validators.required]],
      'university': [ , [Validators.required, Validators.minLength(3)]],
      'faculty': [ , [Validators.required]],
      'department': [ , [Validators.required]],
      'graduationYear': [ , [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      'credit': [ , [Validators.required]],
      'collegeId': [ , [Validators.required, Validators.minLength(4)]],
      'emergencyContact_name': [ , [Validators.required]],
      'emergencyContact_mobile': [ , [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      'emergencyContact_relation': [ , [Validators.required]]
    });
  }

  onSubmit(profileForm: FormGroup){
    this.user = {...this.user, ...this.profileForm.value};
    let ngbDate = this.profileForm.value.birthDate;
    this.user.birthDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
    this.user.profileComplete = true;

    this.usersService.addUserInfo(this.userId, this.user)
    .subscribe(res => {
      this.router.navigate(['dashboard']);
    }, error => {
      //implement error modal here
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.user.profileComplete) alert('Please complete profile first');
    return this.user.profileComplete ? true : false;
    //return this.completedProfile;
  }
}
