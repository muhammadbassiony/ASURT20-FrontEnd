import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Team } from '../models/team.model'; 

const backend_uri = environment.backend_uri;
// const backend_uri = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams: Team[];

  constructor(private http: HttpClient) {}

  getAllTeams(){
    return this.http.get( backend_uri + '/rec/team/all-teams', { responseType: 'json' })
    .pipe(
      map(res => {
        let body = <Team[]>res['allTeams'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getTeam(teamId: string){
    return this.http.get( 
      backend_uri + '/rec/team/' + teamId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Team>res['team'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  // addNewTeam(newTeam: Team){
  //   this.teams.push(newTeam);
  // }
}
