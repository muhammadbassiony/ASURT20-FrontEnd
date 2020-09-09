export class Competition {

  public competitionName: string;
  public competitionInfo: string;
  public competitionImage: string;
  public competitionLogo:string;
  constructor(name: string, description: string,imagePath:string, logoPath: string) {
    this.competitionName = name;
    this.competitionInfo = description;
    this.competitionImage= imagePath;
    this.competitionLogo= logoPath;
  }
}
