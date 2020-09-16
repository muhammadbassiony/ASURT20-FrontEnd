import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Photoroll} from "../photoroll.model";
import {PhotorollService} from "../photoroll.service";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-photo-roll',
  templateUrl: './photo-roll.component.html',
  styleUrls: ['./photo-roll.component.css']
})
export class PhotoRollComponent implements OnInit, OnDestroy {
  public  photoroll: Photoroll ;
   noPhotos = 5;
  // noPhotos = this.photoroll.noPhotos;
   _subscription: Subscription;

  constructor(
    public photorollService: PhotorollService, @Inject(DOCUMENT) document
     ) {
    // this.photoroll = photorollService.photoroll;
    // this._subscription = photorollService.photorollUpdated.subscribe((photoRoll) => {
    //   this.photoroll = photoRoll;
    // });

  }

  ngOnInit(): void {
    // this.photoroll = this.photorollService.photoroll;
    // console.log(this.photoroll);
    this.photoroll = this.photorollService.initialize();
    console.log(this.photoroll.noPhotos);
    this._subscription = this.photorollService.photorollUpdated.subscribe((photoRoll:Photoroll) => {
      this.photoroll = photoRoll;
    });
   console.log(this.photoroll);
  }

  arrayOne(number: number) {
    return Array(number);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }

  documentHasLoaded() {
    if (document.readyState === 'complete') {
      const loadedImages = document.querySelector('.carousel-inner').getElementsByClassName('img-fluid');
      const lastImage = <HTMLImageElement>loadedImages[loadedImages.length - 1];
      console.log(lastImage.complete);
      return lastImage.complete;
    }
    else return false;
  }
}
