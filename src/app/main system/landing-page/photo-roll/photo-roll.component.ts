import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Photoroll} from "../../models/photoroll.model";
import {PhotorollService} from "../../services/photoroll.service";
import {Subject, Subscription} from 'rxjs';
import {DOCUMENT} from "@angular/common";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-roll',
  templateUrl: './photo-roll.component.html',
  styleUrls: ['./photo-roll.component.css']
})
export class PhotoRollComponent implements OnInit {
  
  photoroll: any;
  
  constructor(
    public photorollService: PhotorollService 
  ) { }

  ngOnInit(): void {
    this.photorollService.getAllPhotorolls()
    .subscribe(res => {
      let indx = res.findIndex(ph => ph.title == 'landing page'); //will be replaced
      this.photoroll = res[indx];
    });
  }

  

  
}
