
import {AfterViewChecked, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subscription} from 'rxjs';
import { UserService } from '../authorization/user.service';

import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 

export class HeaderComponent implements OnInit {

  isAuthorized: boolean = false;
  // private userSubscription: Subscription;
  userId: string;

  @Input()isAdminMode: boolean;
  // @Input()isAuthorized: boolean;

  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.applyMql('900px')) {
      header.classList.add('header-closed');
    }
    this.usersService.authUser.subscribe(user => {
      this.isAuthorized = !!user;
      this.userId = user._id;
    });
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
