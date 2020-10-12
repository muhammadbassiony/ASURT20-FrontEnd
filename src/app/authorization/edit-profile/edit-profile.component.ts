import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { take } from 'rxjs/operators';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { AuthUser } from '../authUser.model';

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

  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.authUser
    .subscribe(res => {
      this.authUser = res;
      this.userId = this.authUser._id;
      // console.log('EDIT-PROFILE :: AUTHUSER :: \n', this.authUser);
    })
    console.log('EDIT PROFILE USERID :: ', this.userId);
  }

  onSubmit(profileForm: FormGroup){
    console.log('EDIT PROFILE FORM :: \n', this.profileForm);
    this.usersService.authUser.next(this.authUser);
    this.router.navigate(['dashboard']);
  }
}
