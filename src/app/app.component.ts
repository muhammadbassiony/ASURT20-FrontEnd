import {Component, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ASURT20-FrontEnd';
  constructor(@Inject(DOCUMENT) document) {
  }
  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    let header = document.getElementById('header');
    if (window.pageYOffset > 200) {
      header.classList.add('header-min');
    } else {
      header.classList.remove('header-min');
    }
  }
}
