import {
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FadeInService} from "./fade-in.service";
<<<<<<< HEAD
=======
import {RegistrationService} from './registration/registration.service';
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ASURT20-FrontEnd';
<<<<<<< HEAD
  isAdminMode = false;
  constructor(@Inject(DOCUMENT) document, private fadeInService: FadeInService) {
  }
  ngOnInit() {
    this.fadeInService.fadeIn();
=======
  isAdminMode = true;
  constructor(@Inject(DOCUMENT) document, private registrationService: RegistrationService) {
  }
  ngOnInit() {
    this.registrationService.autoSign();
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
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
