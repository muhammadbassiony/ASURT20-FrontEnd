import {Directive, ElementRef, EventEmitter, HostBinding, Inject, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective implements OnInit {
  constructor(@Inject(DOCUMENT) document, private elementRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          switch (event.url) {
            case '/competition/ever':
              document.querySelector('html').className = 'scroll-ever';
              break;
            case '/competition/formula':
              document.querySelector('html').className = 'scroll-formula';
              break;
            case '/competition/shell':
              document.querySelector('html').className = 'scroll-shell';
              break;
            case '/competition/rov':
              document.querySelector('html').className = 'scroll-rov';
              break;
            default:
              document.querySelector('html').className = 'scroll-default';
              break;
          }
        }
      }
    );
  }
}
