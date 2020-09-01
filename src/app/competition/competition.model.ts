export class Competition {

  public competitionName: string;
  public description: string;
  public LogoPath: string;
  constructor(name: string, description: string, path: string) {
    this.competitionName = name;
    this.description = description;
    this.LogoPath = path;
  }
}
