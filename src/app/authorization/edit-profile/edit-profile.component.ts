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
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, pipe, Subscription, throwError} from 'rxjs';
import { of } from 'rxjs';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { AuthUser } from '../authUser.model';
import { User } from '../user.model';

import { UserService } from '../user.service';

import { EditProfileDeactivateGuard } from './edit-profile-can-deactivate.service';
import {ErrorService} from "../../shared/errorModal/error.service";

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
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.authUser
    .pipe(switchMap(res => {
      this.authUser = res;
      if (!this.authUser) {
        this.router.navigate(['/sign-in']);
      }
      this.userId = this.authUser._id;
      // console.log('EDIT-PROFILE :: AUTHUSER :: \n', this.authUser, this.userId);
      if(this.userId) return this.usersService.getUser(this.userId);
      return of(null);
    }),
    catchError(err => throwError("ERROR NOT CATCHED")))
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

    }, (error) => {
      const path = this.router.getCurrentNavigation().extractedUrl.root.children.primary.segments[0].path;
      if (path != 'sign-in') {
        this.errorService.passError('Error Getting User Profile!', '/dashboard');
      }
    });


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

    // console.log('EDIT KSOM PROFILE AHO BEFORE ::', this.user);
    this.usersService.addUserInfo(this.userId, this.user)
    .subscribe(res => {
      this.user = <User>res;
      this.authUser.profileComplete = true;
      this.usersService.authUser.next(this.authUser);
      this.router.navigate(['dashboard']);
    }, error => {
      this.errorService.passError('Error Saving Profile!', '/home');
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if(!this.user.profileComplete){
      alert('Please complete profile first');
      return false;
    }
    return true;
    // return this.user.profileComplete ? true : false;
    //return this.completedProfile;
  }
}
