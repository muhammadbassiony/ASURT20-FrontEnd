import {Directive, HostListener, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Directive({selector: '[close]'})

export class CloseDirective {
  constructor(@Inject(DOCUMENT) document) {
  }
  @HostListener('window:click', ['$event'])
  onWindowClick (event: any) {
    if (!(event.target.id == 'menu-btn')){
      const menu = <HTMLElement>document.querySelector('.menu-container');
      menu.style.left = '-23rem';
    }
  }

}
