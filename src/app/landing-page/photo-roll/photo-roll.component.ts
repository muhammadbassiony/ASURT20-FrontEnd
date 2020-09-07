import { Component, OnInit } from '@angular/core';
import {Photoroll} from "../photoroll.model";
import {PhotorollService} from "../photoroll.service";

@Component({
  selector: 'app-photo-roll',
  templateUrl: './photo-roll.component.html',
  styleUrls: ['./photo-roll.component.css']
})
export class PhotoRollComponent implements OnInit {
  photoroll: Photoroll;

  constructor(
    public photorollService: PhotorollService
     ) { }

  ngOnInit(): void {
    this.photoroll = this.photorollService.photoroll;
  }

}
