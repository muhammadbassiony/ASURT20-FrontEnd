import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { UserService } from '../authorization/user.service';
import { AuthUser } from '../authorization/authUser.model';

import { ViewInterviewComponent } from '../recruitment system/interviews/admin-interviews/view-interview/view-interview.component';
import { AdminEventsComponent } from '../recruitment system/dashboard/admin-events/admin-events.component';
import { UserEventsComponent } from '../recruitment system/dashboard/user-events/user-events.component';
import { User } from '../authorization/user.model';
import {ErrorService} from "../shared/errorModal/error.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authUser: AuthUser;
  user: User;


  constructor(
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.authUser
    .pipe(
      take(1),
      // switchMap(res => {
      //   this.authUser = res;
      //   return this.usersService.getUser(this.authUser._id);
      // })
    )
    .subscribe(res => {
      // this.user = res;
      this.authUser = res;
      // console.log('AHOOYY DASHBOARD RECEIVED ALL USER:: ', this.user);
    }, (error) => {
      this.errorService.passError('Error Getting User Info!', '/home')
      
    });

  }

}
