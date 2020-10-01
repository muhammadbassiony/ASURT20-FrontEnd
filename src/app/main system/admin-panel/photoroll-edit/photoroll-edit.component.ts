import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  RequiredValidator, 
  FormArray} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ImgMimeType } from '../../../shared/img-mime-type.validator';
import { Photoroll } from '../../models/photoroll.model';
import { PhotorollService } from '../../services/photoroll.service';
import { ImageService } from "../../services/image.service";

// class ImageSnippet {
//   pending: boolean = false;
//   status: string = 'init';

//   constructor(public src: string, public file: File) {}
// }




@Component({
  selector: 'app-photoroll-edit',
  templateUrl: './photoroll-edit.component.html',
  styleUrls: ['./photoroll-edit.component.css']
})
export class PhotorollEditComponent implements OnInit {
  // selectedFile: ImageSnippet;
  // private selectedPhotorollName: string;
  // uploadPaths : string[];
  // photoroll: Photoroll[] = [
  //   new Photoroll(1, 'prize', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history']),
  //   new Photoroll(1, 'landing-page', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history'])
  // ];

 
  // imagePreview: string[];
  // private mode = 'edit/photo-roll';

  allPhotorolls: any;
  photorollForm: FormGroup; // for edit by path
  currentPhotoroll: any; // stores all needed to edit photoroll properties

  constructor( 
    private fb: FormBuilder,
    private imageService: ImageService, 
    public route: ActivatedRoute,
    public photorollService: PhotorollService
  ) { }

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
  


  ngOnInit(){
    this.photorollService.getAllPhotorolls()
    .subscribe(res => {
      this.allPhotorolls = res;
      console.log('RECEIVED ALL PHS ::\n', this.allPhotorolls);
    });

    this.photorollForm = this.fb.group({
      'images': this.fb.array([])
    });


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
  //  this.initForm();
  }

  
  onPhotorollSelect(){
    console.log('CHANGE ::', this.currentPhotoroll);
    
    // this.photorollForm.reset();
    this.photorollForm = this.fb.group({    // restting to a new form without saving
      'images': this.fb.array([])
    });
    
    //patching values to photorollForm from already available data
    if(!this.currentPhotoroll.images) return ;
    this.currentPhotoroll.images.forEach(ip => {
      // const control = new FormControl(ip, [],[ImgMimeType]); // cant mime check on image *PATHS*
      const control = new FormControl(ip);
      (<FormArray>this.photorollForm.get('images')).push(control);
    });
    console.log('CHANGE AFTER ::  \N', this.photorollForm);
  }


  test_im = [];
  newImg: File = null;
  onImgAdded(files: FileList) {
    this.newImg = files.item(0);
    // console.log(this.newImg);

    //here can mime check on a **FILE**
    const control = new FormControl(this.newImg, [], [ImgMimeType]); 
    (<FormArray>this.photorollForm.get('images')).push(control);
    // //number of currently existing images
    let numImgs = this.photorollForm.get('images')['controls'].length; 
    
    (<FormArray>this.photorollForm.get('images')).updateValueAndValidity();
    
    //crude validation technique - mime check is better ------- DELETE LATER!! ---------------
    // if(!this.newImg.type.match(/^image\//)){
    //   alert("Only image files are allowed");
    //   return;
    // }
    console.log('PHFORM VALUE ::\n', this.photorollForm.value.images[numImgs-1]);
    let imageURL;
    const reader = new FileReader();
    reader.onload = () => {
      // imageURL = reader.result as string;
      (<HTMLImageElement>document.getElementById((numImgs-1).toString())).src = reader.result as string;
    }
    reader.readAsDataURL(this.newImg);
    // console.log('CREATED URL :: \n', typeof(imageURL));
    // let img2 = this.photorollForm.value.images[numImgs-1];
    // img2['url'] = imageURL;
    // console.log('TRIAL :: ', img2);
    // this.photorollForm.value.images[numImgs-1] = img2;
    // console.log('TRTIAL SUX??\n', this.photorollForm.value);

  }

  onSubmit(PhotorollForm: FormGroup) {
    console.log('SUBMIT FORM  :: \n', this.photorollForm);
  }

  // // 1) edit by url
  // private initForm() {
  //   // let photorollName = '';
  //   // let photorollIndex = null;
  //   // let photorollPaths = new FormArray([]);

  //   // //let files = new FormArray([new FormGroup({'file':new FormControl(null, Validators.required)})]) ;
  //   // const photoroll: Photoroll = this.currentPhotoroll;
  //   // photorollName = photoroll.photorollName;
  //   // // photorollIndex = photoroll.index;
  //   // for (let imagePath of photoroll.imagePaths) {
  //   //   photorollPaths.push(new FormGroup({
  //   //     'imagePath': new FormControl(imagePath, Validators.required)
  //   //   }));
  //   // }
  //   // this.form = new FormGroup({
  //   //   'name': new FormControl(photorollName, Validators.required),
  //   //   'index': new FormControl(photorollIndex, Validators.required),
  //   //   'paths' : photorollPaths,
  //   //   // 'files' : files
  //   // });
  // }

  // get controls() { // a getter!
  //   return (<FormArray>this.form.get('paths')).controls;
  // }

  // onDeletePath(index: number) {
  //   (<FormArray>this.form.get('paths')).removeAt(index);
  // }

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


  // onActiveImagePicked(event: Event) {
  //   // let noFiles = (event.target as HTMLInputElement).files.length;
  //
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({activeImage: file});
  //   this.form.get('activeImage').updateValueAndValidity({onlySelf: true});
  //   const reader = new FileReader();
  //   // this.photoroll.imagePaths.push((reader.result as string));
  //   reader.onload = () => {
  //     // this.photoroll.imagePaths.push((reader.result as string));
  //     // this.imagePreview.push((reader.result as string));
  //   };
  //   reader.readAsDataURL(file);
  //   // this.photoroll.imagePaths.push(reader.result as string );
  //   // console.log(this.imagePreview)
  // }


  // onOtherImagePicked(event: Event) {
  //   const noFiles = (event.target as HTMLInputElement).files.length;
  //   console.log(noFiles);
  //   console.log((event.target as HTMLInputElement).files);
  //   // for (let i=0; i<noFiles; i++) {
  //   const files = (event.target as HTMLInputElement).files;
  //   this.form.patchValue({otherImages: files});
  //   this.form.get('otherImages').updateValueAndValidity({onlySelf: true});
  //   for (let i = 0; i < noFiles; i++) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // this.photoroll.imagePaths.push((reader.result as string));
  //       // this.imagePreview.push((reader.result as string));
  //     };
  //     const file = files[i];
  //     console.log(file);
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onSubmit(PhotorollForm: FormGroup) {

  //   //this.photorollService.updatePhotoroll (this.form.value , this.currentPhotoroll);
  //   // this.currentPhotoroll = this.form.value;
  //   // for (let path of this.uploadPaths){
  //   //   this.currentPhotoroll.imagePaths.push(path);
  //   // }
  //   // console.log(this.currentPhotoroll);
  //   // // this.photorollService.updatePhotoroll (this.form.value , this.currentPhotoroll);
  // }

  // onCancel() {
  //   // this.form.reset();
  // }



  // onChange(value: any) {
  //   this.selectedPhotorollName = value.value;
  //   console.log(this.selectedPhotorollName);
  //   // this.currentPhotoroll = this.photorollService.getPhotorollByName(this.selectedPhotorollName);
  //   console.log(this.currentPhotoroll);
  //   this.initForm();
  // }

  // onAddPhoto() {
  //   (<FormArray>this.form.get('paths')).push(
  //     new FormGroup({
  //       'imagePath': new FormControl(null, Validators.required)
  //     })
  //   );
  // }

  // onImagePicked(event: Event) {
  //
  //   const reader = new FileReader();
  //   const file = (event.target as HTMLInputElement).files[0];
  //     reader.readAsDataURL(file);
  //
  //     reader.onload = () => {
  //       // this.form.patchValue({
  //         // file: reader.result;
  //         // console.log(this.form.get('file'));});
  //       (<FormArray>this.form.get('files')).push(new FormGroup({
  //         'file': new FormControl(file, Validators.required)}));
  //     };
  //   }

    // upload photo new
//   noPhotoToBeAdded: number = 1;

//   private onSuccess() {
//     this.selectedFile.pending = false;
//     this.selectedFile.status = 'ok';
//   }

//   private onError() {
//     this.selectedFile.pending = false;
//     this.selectedFile.status = 'fail';
//     this.selectedFile.src = '';
//   }

//   processFile(imageInput: any) {
//     const file: File = imageInput.files[0];
//     const reader = new FileReader();

//     reader.addEventListener('load', (event: any) => {

//       this.selectedFile = new ImageSnippet(event.target.result, file);

//       this.selectedFile.pending = true;
//       this.imageService.uploadImage(this.selectedFile.file).subscribe(
//         (res) => {
//           this.onSuccess();
//           //this.currentPhotoroll.imagePaths.push( res.value.imagePath );
//           this.uploadPaths.push(res.value.imagePath);
//         },
//         (err) => {
//           this.onError();
//         })
//     });

//     reader.readAsDataURL(file);
//   }
// //utility functions
//   arrayOne(number: number) {
//     return Array(number);
//   }
}
