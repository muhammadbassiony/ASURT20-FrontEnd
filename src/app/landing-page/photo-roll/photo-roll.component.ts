import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Photoroll} from "../photoroll.model";
import {PhotorollService} from "../photoroll.service";
import {Subject, Subscription} from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-photo-roll',
  templateUrl: './photo-roll.component.html',
  styleUrls: ['./photo-roll.component.css']
})
export class PhotoRollComponent implements OnInit, OnDestroy {
  public  photoroll: Photoroll ;
  loadedSubject = new Subject<boolean>();
  noPhotos: number = 0;
  noLoaded: number = 0;
  _loadedSubscription: Subscription;
  _subscription: Subscription;
  naturalHeight: any;
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
    //this.photoroll = this.photorollService.initialize()[1];
    this.photorollService.initialize();
    this.photoroll = this.photorollService.getPhotorollByName('landing-page');
    console.log(this.photoroll.noPhotos);
    this._subscription = this.photorollService.photorollUpdated.subscribe((photoRoll: Photoroll) => {
      this.photoroll = photoRoll;
    });
    this.noPhotos = this.photoroll.noPhotos;
    this._loadedSubscription = this.loadedSubject.subscribe((loaded) => {
      if (loaded) {
        this.noLoaded++;
      }
      if (this.noLoaded == this.noPhotos) {
        this._loadedSubscription.unsubscribe();
      }
    });
   console.log(this.photoroll);
  }

  arrayOne(number: number) {
    return Array(number);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscription.unsubscribe();
    this._loadedSubscription.unsubscribe();
  }
  allIsLoaded() {
    if (this.noLoaded < this.noPhotos) {
      console.log('notLoaded');
    } else {
      console.log('loaded');
    }
    return this.noLoaded == this.noPhotos;
  }
}
