<<<<<<< HEAD
import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
=======
import {AfterViewChecked, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subscription} from 'rxjs';
import {RegistrationService} from '../registration/registration.service';
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
<<<<<<< HEAD
export class HeaderComponent implements OnInit, AfterViewChecked {

  @Input()isAdminMode: boolean;
  constructor(@Inject(DOCUMENT) document) {
=======
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthorized: boolean = false;
    
  private userSubscription: Subscription;
  @Input()isAdminMode: boolean;
  constructor(@Inject(DOCUMENT) document, private registrationService: RegistrationService) {
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40

  }

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.applyMql('900px')) {
      header.classList.add('header-closed');
    }
<<<<<<< HEAD
  }

  ngAfterViewChecked() {

=======
    this.userSubscription = this.registrationService.user.subscribe(user => {
      this.isAuthorized = !!user;
    });
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
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
<<<<<<< HEAD
=======

  onLogout() {
    this.registrationService.logout();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
}
