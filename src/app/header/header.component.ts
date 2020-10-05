import {AfterViewChecked, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { UserService } from '../authorization/user.service';
import { CompetitionsService } from '../main system/services/competitions.service';

import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Competition } from '../main system/models/competition.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 

export class HeaderComponent implements OnInit {

  // isAuthorized: boolean = false;
  // private userSubscription: Subscription;
  userId: string;
  allComps: Competition[];

  @Input()isAdminMode: boolean;
  @Input()isAuthorized: boolean;

  constructor(
    private usersService: UserService,
    private competitionsService: CompetitionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.applyMql('900px')) {
      header.classList.add('header-closed');
    }

    this.competitionsService.getAllCompetitions()
    .pipe(switchMap(comps => {
      this.allComps= comps;
      // console.log('HEADER GOT ALL COMPS :: \n', this.allComps);
      return this.usersService.authUser;
    }))
    .subscribe(user => {
      // console.log('HEADER AUTHUSER SUBS :: ', user);
      this.isAuthorized = !!user;
      this.userId = user._id;
    })

    
    
  }

  onToggleHeader() {
    const header = document.getElementById('header');
    header.classList.toggle('header-closed');
  }

  applyMql(bp: string) {
    let mql = window.matchMedia(`only screen and (max-width: ${bp})`);
    return mql.matches;
  }

  // ADMIN MODE SPECIFIC
  onOpenMenu() {
    let menu = <HTMLElement>document.querySelector('.menu-container');
    menu.style.left = '0';
  }

  onLogout() {
    this.usersService.logout();
  }

  
}
