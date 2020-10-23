import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import { UserService } from 'src/app/authorization/user.service';
import { AuthUser } from 'src/app/authorization/authUser.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  authUser: AuthUser;
  @Input() isAdminMode: boolean
  constructor(
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.usersService.authUser
    .subscribe(res => {
      this.authUser = res;
    }, err => {

    });
    
  }


  onCloseMenu() {
    let menu = <HTMLElement>document.querySelector('.menu-container');
    // menu.style.right = '-23rem';
    menu.style.left = '-23rem';
  }

}
