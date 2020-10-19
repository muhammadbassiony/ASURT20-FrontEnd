import {AfterViewChecked, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DOCUMENT} from "@angular/common";

import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { UserService } from '../authorization/user.service';
import { CompetitionsService } from '../main system/services/competitions.service';

import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Competition } from '../main system/models/competition.model';
import { ErrorService } from '../shared/errorModal/error.service';

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
  // isLoading = true;

  @Input()isAdminMode: boolean;
  @Input()isAuthorized: boolean;

  @Output() isLoading = new EventEmitter<boolean>(true);

  constructor(
    private errorService: ErrorService,
    private usersService: UserService,
    private competitionsService: CompetitionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.matchMql('900px')) {
      header.classList.add('header-closed');
    }

    this.competitionsService.getAllCompetitions()
    .pipe(switchMap(comps => {
      // this.isLoading = false;
      this.isLoading.emit(false);
      this.allComps= comps;
      // console.log('HEADER GOT ALL COMPS :: \n', this.allComps);
      return this.usersService.authUser;
    }))
    .subscribe(user => {
      this.isLoading.emit(false);
      // console.log('HEADER AUTHUSER SUBS :: ', user);
      this.isAuthorized = !!user;
      if (this.isAuthorized) {
        this.userId = user._id;
      }
    }, error => {
      this.errorService.passError('Error Loading Competitions!', '/loading');
    });



  }

  onToggleHeader() {
    const header = document.getElementById('header');
    header.classList.toggle('header-closed');
  }

  matchMql(bp: string) {
    let mql = window.matchMedia(`only screen and (max-width: ${bp})`);
    return mql.matches;
  }

  // ADMIN MODE SPECIFIC
  onOpenMenu() {
    const menu = <HTMLElement>document.querySelector('.menu-container');
    if (menu.style.left == '0px') {
      menu.style.left = '-23rem';
    } else {
      menu.style.left = '0px';
    }
  }

  onLogout() {
    this.usersService.logout();
  }


}
