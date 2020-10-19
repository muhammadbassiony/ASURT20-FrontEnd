import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Photoroll} from "../../services/photoroll.service";
import {PhotorollService} from "../../services/photoroll.service";
import {Subject, Subscription} from 'rxjs';
import {DOCUMENT} from "@angular/common";
import { switchMap } from 'rxjs/operators';


import { ErrorService } from '../../../shared/errorModal/error.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-photo-roll',
  templateUrl: './photo-roll.component.html',
  styleUrls: ['./photo-roll.component.css']
})
export class PhotoRollComponent implements OnInit {

  backend_uri = environment.backend_uri_static;
  @Input('photorollId') photorollId: string = ' ';
  photoroll: Photoroll;

  constructor(
    private errorService: ErrorService,
    public photorollService: PhotorollService
  ) { }

  ngOnInit(): void {
    this.photorollService.getPhotoroll(this.photorollId? this.photorollId : "fakeId")
    .subscribe(res => {
      this.photoroll = res;
      this.photoroll.newImgs = [];
      for(let i of this.photoroll.images){
        this.photoroll.newImgs.push(this.backend_uri + i);
      }
    }, error => {
      this.errorService.passError('Error Loading Photo Roll!', '/home');
    });
  }

}
