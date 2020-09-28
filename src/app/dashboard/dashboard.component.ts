import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';
  
import { RegistrationService } from '../registration/registration.service';
import { AuthUser } from '../registration/authUser.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: AuthUser;


  constructor(
    private authService: RegistrationService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.route);
    this.authService.authUser
    .pipe(take(1))
    .subscribe(res => {
      this.user = res;
      // console.log('AHOOYY :: ', this.user)
    });
    
  }

}
