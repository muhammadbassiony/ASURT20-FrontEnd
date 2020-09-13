import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Prize } from './prize.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient) {
  }
  storePrize(prizeJSON) {
    this.http.post('', prizeJSON).subscribe(response => {
      console.log(response);
    })
  }


  getPrize(competitionName:string){
    return this.http.get<Prize[]>(`/${competitionName}`)
  }
}
