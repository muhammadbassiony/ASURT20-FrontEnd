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
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { User } from '../../../authorization/user.model';
import { UserService } from '../../../authorization/user.service';
import {ErrorService} from "../../../shared/errorModal/error.service";


@Component({
  selector: 'app-view-all-members',
  templateUrl: './view-all-members.component.html',
  styleUrls: ['./view-all-members.component.css']
})
export class ViewAllMembersComponent implements OnInit {

  query: string; //search query -- dont delete
  allUsers: any[];

  constructor(
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllMembers()
    .subscribe(res => {
      this.allUsers = res;
    }, (error) => {
      this.errorService.passError('Error Getting All Members!', '/dashboard')
    })
  }
}
