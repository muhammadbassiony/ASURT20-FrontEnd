// export class Photoroll {
//   // imagePath1: string;
//   // imagePath2: string;
//   // imagePath3: string;
//   public imagePaths: string[] ;
//   public noPhotos: number;
//   public index: number;
//   public photorollName: string;

//   constructor( index: number, photorollName: string, numPhoto: number, imagePaths: string[]) {
//     this.index = index;
//     this.photorollName = photorollName;
//     this.imagePaths = imagePaths;
//     this.noPhotos = numPhoto;
// }
// }

export interface Photoroll {
  _id: string;
  images: string[];
  title: string;
}
