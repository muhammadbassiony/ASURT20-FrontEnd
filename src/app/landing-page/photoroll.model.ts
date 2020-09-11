export class Photoroll {
  // imagePath1: string;
  // imagePath2: string;
  // imagePath3: string;
  public imagePaths:  string[] ;
  public noPhotos:number;

  constructor(number:number, imagePaths:string[]) {
    this.imagePaths = imagePaths;;
    this.noPhotos = number;
}
}
