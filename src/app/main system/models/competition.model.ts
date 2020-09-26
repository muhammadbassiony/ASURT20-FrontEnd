export class Competition {

  public competitionName: string;
  public competitionInfo: string;
  public competitionImage: string;
  public competitionLogo: string;
  public visible: boolean;

  constructor(name: string, description: string,imagePath:string, logoPath: string, visible?: boolean) {
    this.competitionName = name;
    this.competitionInfo = description;
    this.competitionImage= imagePath;
    this.competitionLogo= logoPath;
    this.visible = visible;
  }
}
