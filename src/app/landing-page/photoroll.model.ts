export class Photoroll {
  // imagePath1: string;
  // imagePath2: string;
  // imagePath3: string;
<<<<<<< HEAD
  public imagePaths:  string[] ;
  public noPhotos:number;

  constructor(number:number, imagePaths:string[]) {
    this.imagePaths = imagePaths;;
    this.noPhotos = number;
=======
  public imagePaths: string[] ;
  public noPhotos: number;
  public index: number;
  public  photorollName: string;

  constructor( index: number, photorollName: string, numPhoto: number, imagePaths: string[]) {
    this.index = index;
    this.photorollName = photorollName;
    this.imagePaths = imagePaths;
    this.noPhotos = numPhoto;
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
}
}
