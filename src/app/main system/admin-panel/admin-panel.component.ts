import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @Input() isAdminMode: boolean
  constructor(@Inject(DOCUMENT) document) { }
  ngOnInit(): void {

  }


  onCloseMenu() {
    let menu = <HTMLElement>document.querySelector('.menu-container');
    // menu.style.right = '-23rem';
    menu.style.left = '-23rem';
  }

}
