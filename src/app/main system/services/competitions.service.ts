import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Competition} from '../models/competition.model';
const backend_uri = environment.backend_uri;

interface GetResponse {
  name: string;
  visible: boolean;
  prizes: any;
  photoroll: any
}

@Injectable({providedIn: 'root'})
export class CompetitionsService {

  allCompetitions: Competition[];
  constructor(private http: HttpClient) {}
  getAllCompetitions () {
    const url = backend_uri + '/main/competitions/getAll';
    return this.http.get<{competitions: GetResponse[]}>(url);
  }
  changeCompetitionVisibility(isChecked: boolean[]) {
    this.getAllCompetitions().subscribe((successResponse) => {
      console.log(successResponse);
    }, error => {
      console.log(error);
    });
  }
}
