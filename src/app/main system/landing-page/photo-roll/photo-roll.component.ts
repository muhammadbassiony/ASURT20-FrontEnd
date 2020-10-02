import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
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
  
  @Input('photorollId') photorollId: string = ' ';
  photoroll: any;
  
  constructor(
    public photorollService: PhotorollService 
  ) { }

  ngOnInit(): void {
    this.photorollService.getPhotoroll(this.photorollId? this.photorollId : "fakeId")
    .subscribe(res => {
      this.photoroll = res;
    });
  }

}
