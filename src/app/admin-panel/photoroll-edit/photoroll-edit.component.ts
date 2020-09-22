import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { mimeType } from './mime-type.validator';
import {Photoroll} from '../../landing-page/photoroll.model';
import {PhotorollService} from '../../landing-page/photoroll.service';

@Component({
  selector: 'app-photoroll-edit',
  templateUrl: './photoroll-edit.component.html',
  styleUrls: ['./photoroll-edit.component.css']
})
export class PhotorollEditComponent implements OnInit {
  private selectedPhotorollName: string;
  photoroll: Photoroll[] = [
    new Photoroll(1, 'prize', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history']),
    new Photoroll(1, 'landing-page', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history'])
  ];
  form: FormGroup;
  // imagePreview: string[];
  private mode = 'edit/photo-roll';
  currentPhotoroll: Photoroll; // stores all needed to edit photoroll properties

  constructor( public route: ActivatedRoute,
               public photorollService: PhotorollService) { }

  // filename = 'robert fermino';

  /*= this.photorollService.getPhotorollByName(this.selectedPhotoroll);*/

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

  // onSavePhotos() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   console.log(this.form);
  //   this.photorollService.addPhotoroll(
  //     this.form.value.activeImage,
  //     this.form.value.otherImages
  //   );
  //   // console.log(this.form);
  //   // setTimeout(() => {
  //   //   this.form.reset();
  //   // }, 4000);
  // }
  photorollForm: any;


  ngOnInit(): void {
    // this.photoroll = [
    //   new Photoroll(1,'prize', 4, ['dsfdfdf'] )
    // ];
    // this.photoroll = this.photorollService.initialize();
    // console.log(this.photoroll);
    // this.form = new FormGroup({
    //   activeImage: new FormControl(null, {
    //   validators: [Validators.required],
    //     asyncValidators: [mimeType]
    // }),
    // otherImages: new FormControl(null, {
    //   validators: [Validators.required],
    //   asyncValidators: [mimeType]
    // })
    // });
   this.initForm();
  }

  private initForm() {
    let photorollName = '';
    let photorollIndex = null;
    let photorollPaths = new FormArray([]);

    let files = new FormArray([new FormGroup({'file':new FormControl(null, Validators.required)})]) ;
    const photoroll: Photoroll = this.currentPhotoroll;
    photorollName = photoroll.photorollName;
    photorollIndex = photoroll.index;
    for (let imagePath of photoroll.imagePaths) {
      photorollPaths.push(new FormGroup({
        'imagePath': new FormControl(imagePath, Validators.required)
      }));
    }
    this.form = new FormGroup({
      'name': new FormControl(photorollName, Validators.required),
      'index': new FormControl(photorollIndex, Validators.required),
      'paths' : photorollPaths,
      'files' : files
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.form.get('paths')).controls;
  }

  onDeletePath(index: number) {
    (<FormArray>this.form.get('paths')).removeAt(index);
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
    // let noFiles = (event.target as HTMLInputElement).files.length;

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({activeImage: file});
    this.form.get('activeImage').updateValueAndValidity({onlySelf: true});
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
    const noFiles = (event.target as HTMLInputElement).files.length;
    console.log(noFiles);
    console.log((event.target as HTMLInputElement).files);
    // for (let i=0; i<noFiles; i++) {
    const files = (event.target as HTMLInputElement).files;
    this.form.patchValue({otherImages: files});
    this.form.get('otherImages').updateValueAndValidity({onlySelf: true});
    for (let i = 0; i < noFiles; i++) {
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

  onSubmit() {

    this.photorollService.updatePhotoroll (this.form.value);

  }

  onCancel() {

  }

  onDeleteIngredient(i: number) {

  }

  onAddIngredient() {

  }

  onChange(value: any) {
    this.selectedPhotorollName = value.value;
    console.log(this.selectedPhotorollName);
    this.currentPhotoroll = this.photorollService.getPhotorollByName(this.selectedPhotorollName);
    console.log(this.currentPhotoroll);
    this.initForm();
  }

  onAddPhoto() {
    (<FormArray>this.form.get('paths')).push(
      new FormGroup({
        'imagePath': new FormControl(null, Validators.required)
      })
    );
  }

  onImagePicked(event: Event) {

    const reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.form.patchValue({
          // file: reader.result;
          // console.log(this.form.get('file'));});
        (<FormArray>this.form.get('files')).push(new FormGroup({
          'file': new FormControl(file, Validators.required)}));
      };
    }

}
