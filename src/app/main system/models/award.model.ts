// export class Prize {
//   constructor(public competitionName: string,
//               public title: string,
//               public description: string,
//               public imagePrize: string) {}
// }

export interface Award {

  _id?: string;
  title: string;
  description: string;

  awardImg?: File;
  imagePath?: string;
  
}