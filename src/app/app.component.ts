import {
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FadeInService} from "./shared/fade-in.service";
import {RegistrationService} from './registration/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ASURT20-FrontEnd';
  isAdminMode = false;
  constructor(@Inject(DOCUMENT) document, private registrationService: RegistrationService) {
  }
  ngOnInit() {
    this.registrationService.autoSignin();
    this.registrationService.authUser.subscribe((user) => {
      if (!user) {
        this.isAdminMode = false;
      } else {
        this.isAdminMode = user.level >= 1;
      }
    });
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
