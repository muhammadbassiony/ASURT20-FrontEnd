import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { mimeType } from './mime-type.validator';
import {Photoroll} from '../photoroll.model';
import {PhotorollService} from "../photoroll.service";

@Component({
  selector: 'app-photoroll-edit',
  templateUrl: './photoroll-edit.component.html',
  styleUrls: ['./photoroll-edit.component.css']
})
export class PhotorollEditComponent implements OnInit {
  photoroll: Photoroll;
  form: FormGroup;
  imagePreview1: string;
  imagePreview2: string;
  imagePreview3: string;
  private mode = "edit/photo-roll";


  constructor( public route: ActivatedRoute,
               public photorollService: PhotorollService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      image1: new FormControl(null, {
      validators: [Validators.required],
        asyncValidators: [mimeType]
    }),
    image2: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    image3: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
    });
  }

  onImagePicked1(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image1: file });
    this.form.get('image1').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview1 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImagePicked2(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image2: file });
    this.form.get('image2').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview2 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImagePicked3(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image3: file });
    this.form.get('image3').updateValueAndValidity();
    // console.log(this.form);
    // console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview3 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePhotos() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.photorollService.addPhotoroll(
      this.form.value.image1,
      this.form.value.image2,
      this.form.value.image3
    );
    // console.log(this.form);
    // setTimeout(() => {
    //   this.form.reset();
    // }, 4000);
  }
}
