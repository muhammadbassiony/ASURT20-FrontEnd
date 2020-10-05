import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import {environment} from '../../../environments/environment';
const backend_uri = environment.backend_uri;

import {Competition} from '../models/competition.model';
import { Award } from '../models/award.model';




@Injectable({providedIn: 'root'})
export class CompetitionsService {

  // allCompetitions: Competition[];
  constructor(private http: HttpClient) {}

  getAllCompetitions(){
    return this.http.get(
      backend_uri + '/main/competitions/get-all-comps',
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['competitions'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  getCompetition(compId: string){
    return this.http.get(
      backend_uri + '/main/competitions/get-comp/' + compId,
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['competition'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  updateCompetition(compId: string, comp: Competition){
    let competition = {
      name: comp.name,
      visible: comp.visible,
      awards: comp.awards,
      photoroll: comp.photoroll
    };

    return this.http.put(
      backend_uri + '/main/competitions/update-comp/' + compId,
      { competition },
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['competition'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  addNewAward(compId: string, newAward: Award){
    let awardData = new FormData();
    awardData.append('title', newAward.title);
    awardData.append('description', newAward.description);
    awardData.append('awardImg', newAward.awardImg);

    return this.http.post(
      backend_uri + '/main/competitions/add-award/' + compId,
      { newAward },
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['competition'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  updateAward(awardId: string, updatedAward: Award){}


  deleteAward(awardId: string){}

}
