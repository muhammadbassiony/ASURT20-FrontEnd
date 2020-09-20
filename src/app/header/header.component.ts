import {AfterViewChecked, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subscription} from 'rxjs';
import {RegistrationService} from '../registration/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthorized: boolean = false;
  private userSubscription: Subscription;
  @Input()isAdminMode: boolean;
  constructor(@Inject(DOCUMENT) document, private registrationService: RegistrationService) {

  }

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.applyMql('900px')) {
      header.classList.add('header-closed');
    }
    this.userSubscription = this.registrationService.user.subscribe(user => {
      this.isAuthorized = !!user;
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
    this.registrationService.logout();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
