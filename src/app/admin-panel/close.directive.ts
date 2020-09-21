import {Directive, HostListener, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Directive({selector: '[close]'})

export class CloseDirective {
  constructor(@Inject(DOCUMENT) document) {
  }
  @HostListener('window:click', ['$event'])
  onWindowClick (event: any) {
    let offset = 180; // Why 180? it's empirical, man. It's here to prevent clicks on header from closing the menu.
    let mql = window.matchMedia('only screen and (max-width: 900px)');
    if (mql.matches) {
      offset = 285; //Same but for smaller screen with bigger header size
    }
    if (event.screenY > offset) {
      const menu = <HTMLElement>document.querySelector('.menu-container');
      menu.style.left = '-23rem';
      console.log('Tamam');
    }
  }

}
