import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { mimeType } from './mime-type.validator';
import {Photoroll} from '../../landing-page/photoroll.model';
import {PhotorollService} from "../../landing-page/photoroll.service";

@Component({
  selector: 'app-photoroll-edit',
  templateUrl: './photoroll-edit.component.html',
  styleUrls: ['./photoroll-edit.component.css']
})
export class PhotorollEditComponent implements OnInit {
  photoroll: Photoroll;
  form: FormGroup;
  imagePreview: string[]
  private mode = "edit/photo-roll";


  constructor( public route: ActivatedRoute,
               public photorollService: PhotorollService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      activeImage: new FormControl(null, {
      validators: [Validators.required],
        asyncValidators: [mimeType]
    }),
    otherImages: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
    });


  }

  // items: any[] = [
  //   { id: 1, name: 'one' },
  //   { id: 2, name: 'two' },
  //   { id: 3, name: 'three' },
  //   { id: 4, name: 'four' },
  //   { id: 5, name: 'five' },
  //   { id: 6, name: 'six' }
  // ];
  // selected: number = 1;

  // selectOption(id: number) {
  //   //getted from event
  //   console.log(id);
  //   //getted from binding
  //   console.log(this.selected)
  // }


  onActiveImagePicked(event: Event) {
    //let noFiles = (event.target as HTMLInputElement).files.length;

      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({activeImage: file});
      this.form.get("activeImage").updateValueAndValidity({onlySelf:true});
      const reader = new FileReader();
    // this.photoroll.imagePaths.push((reader.result as string));
      reader.onload = () => {
        // this.photoroll.imagePaths.push((reader.result as string));
        // this.imagePreview.push((reader.result as string));
      };
      reader.readAsDataURL(file);
      // this.photoroll.imagePaths.push(reader.result as string );
      // console.log(this.imagePreview)
    }


  onOtherImagePicked(event: Event) {
    let noFiles = (event.target as HTMLInputElement).files.length;
    console.log(noFiles);
    console.log((event.target as HTMLInputElement).files)
    // for (let i=0; i<noFiles; i++) {
      const files = (event.target as HTMLInputElement).files;
      this.form.patchValue({otherImages: files});
      this.form.get("otherImages").updateValueAndValidity({onlySelf:true});
    for (let i=0; i<noFiles; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        // this.photoroll.imagePaths.push((reader.result as string));
        // this.imagePreview.push((reader.result as string));
      };
      const file = files[i];
      console.log(file);
      reader.readAsDataURL(file);
     }
  }

  // onImagePicked2(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image2: file });
  //   this.form.get('image2').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview2 = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }
  //
  // onImagePicked3(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image3: file });
  //   this.form.get('image3').updateValueAndValidity();
  //   // console.log(this.form);
  //   // console.log(file);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview3 = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSavePhotos() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.photorollService.addPhotoroll(
      this.form.value.activeImage,
      this.form.value.otherImages
    );
    // console.log(this.form);
    // setTimeout(() => {
    //   this.form.reset();
    // }, 4000);
  }
}
