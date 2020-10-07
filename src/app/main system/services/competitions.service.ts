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


  getAllCompetitionsPopulated(){
    return this.http.get(
      backend_uri + '/main/competitions/get-all-comps-populated',
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
    console.log('CMP SRVC - UPDATE CMP :: \n', competition);
    return this.http.put(
      backend_uri + '/main/competitions/update-comp/' + compId,
      { ...competition },
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
    console.log('COMPSERVICE - ADD NEW AWARD FD :: \n', awardData);

    return this.http.post(
      backend_uri + '/main/competitions/add-award/' + compId,
      { awardData },
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['award'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  updateAward(awardId: string, updatedAward: Award){
    let awardData = new FormData();
    awardData.append('title', updatedAward.title);
    awardData.append('description', updatedAward.description);
    awardData.append('awardImg', updatedAward.awardImg);
    console.log('COMPSERVICE - UPDATE AWARD FD :: \n', awardData);
    
    return this.http.put(
      backend_uri + '/main/competitions/update-award/' + awardId,
      { awardData },
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['award'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  deleteAward(awardId: string, compId: string){
    return this.http.delete(
      backend_uri + '/main/competitions/delete-award/' + awardId + '/' + compId,
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        return null;    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

}
