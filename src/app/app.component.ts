import {
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FadeInService} from "./shared/fade-in.service";
import { UserService } from './authorization/user.service';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'ASURT20-FrontEnd';
  isAdminMode = false;
  isAuthorized = false;
  isLoading = true;


  constructor(
    private usersService: UserService) { }


  ngOnInit() {
    this.usersService.autoSignin();
    this.usersService.authUser.subscribe((user) => {
      if (!user) {
        this.isAuthorized = false;
        this.isAdminMode = false;
      } else {
        this.isAuthorized = true;
        this.isAdminMode = user.level >= 1;
      }
    });
  }

  toggleLoading(val){
    console.log('APP COMP TS - LOADING VAL ::: ', val);
    this.isLoading = val;
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    let mql = window.matchMedia("screen and (max-width: 900px)");
    if (!mql.matches)
    {
      let header = document.getElementById('header');
      if (window.pageYOffset > 120) {
        header.classList.add('header-min');
      } else {
        header.classList.remove('header-min');
      }
    }

  }

}
