import {AfterContentChecked, Component, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FadeInService} from "./fade-in.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'ASURT20-FrontEnd';
  isAdminMode = false;
  constructor(@Inject(DOCUMENT) document, private fadeInService: FadeInService) {
  }
  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.fadeInService.fadeIn();
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
