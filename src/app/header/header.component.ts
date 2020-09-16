import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  @Input()isAdminMode: boolean;
  constructor(@Inject(DOCUMENT) document) {

  }

  ngOnInit(): void {
    const header = document.getElementById('header');
    if (this.applyMql('900px')) {
      header.classList.add('header-closed');
    }
  }

  ngAfterViewChecked() {

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
}
