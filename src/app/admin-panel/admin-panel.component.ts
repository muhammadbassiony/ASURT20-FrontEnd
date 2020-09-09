import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document) { }
  ngOnInit(): void {

  }
  onOpenMenu() {
    let menu = <HTMLElement>document.querySelector('.menu-container');
    let menuBtn = <HTMLInputElement>document.getElementById('menuBtn');
    if (menuBtn.checked) {
      menuBtn.checked = false;
      menu.style.right = '0';
    } else {
      menu.style.right = '-23rem';
    }
  }

  onCloseMenu() {
    let menu = <HTMLElement>document.querySelector('.menu-container');
    menu.style.right = '-23rem';
    // menu.style.left = '-23rem';
  }

}
