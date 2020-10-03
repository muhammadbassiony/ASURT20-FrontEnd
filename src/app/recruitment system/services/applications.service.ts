import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
const backend_uri = environment.backend_uri;

import { Application } from '../models/application.model';
import { ApplicationStatus } from '../models/app-status-enum.model';
import { ApplicationPhase } from '../models/app-phases-enum.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';

import { EventsService } from './events.service';


@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private teams: Team[];
  private events: Event[];
  private users: User[];
  private applications: Application[];
 
  constructor(private http: HttpClient) {}

  getAllApplications(){ 
    //why?
  }

  getApplication(appId: string){
    return this.http.get(
      backend_uri + '/rec/application/get-app/' + appId,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['application'];    
        return body || [];  
      })
      ,
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  addNewApplication(newApp: any){
    console.log("adding new app", newApp);
    
    const appData = new FormData();
    appData.append('userId', newApp.userId);
    appData.append('eventId', newApp.eventId);
    appData.append('cv', newApp.userCV);
    appData.append('selectedSubteam1', newApp.selectedSubteam1);
    appData.append('selectedSubteam2', newApp.selectedSubteam2);
    appData.append('userAnswers', JSON.stringify(newApp.userAnswers));

    return this.http.post( 
      backend_uri + '/rec/application/add-new-app', 
      appData, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        console.log('created new app - app service ::\n', res);
        let body = res['application'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getUserApps(userId: string){
    return this.http.get( 
      backend_uri + '/rec/application/user-apps/' + userId,  
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['applications'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getEventApps(eventId: string){
    return this.http.get( 
      backend_uri + '/rec/application/event-apps/' + eventId,  
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['applications'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getSubteamApps(subteamId: string){
    return this.http.get( 
      backend_uri + '/rec/application/subteam-apps/' + subteamId,  
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['applications'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  updateApp(appId: string, newApp: Application){

    let app = {
      userId: newApp.userId,
      eventId: newApp.eventId,
      selectedSubteam1: newApp.selectedSubteam1,
      selectedSubteam2: newApp.selectedSubteam2,
      cvPath: newApp.cvPath,
      userAnswers: newApp.userAnswers,
      currentPhase: newApp.currentPhase,
      currentPhaseStatus: newApp.currentPhaseStatus
    };

    return this.http.put( 
      backend_uri + '/rec/application/update-app/' + appId, 
      app, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['app'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getUserEvents(userId: string){
    return this.http.get( 
      backend_uri + '/rec/application/user-event-apps/' + userId,  
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = { 
          appliedTo: res['appliedTo'],
          didntApply: res['didntApply']
        };  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  sendAcceptedEmails(eventId: string, phase: string){
    return this.http.post( 
      backend_uri + '/rec/application/send-acc-mails/' + eventId,  
      {
        phase: phase
      },
      { responseType: 'json' }
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

  sendRejectedEmails(eventId: string, phase: string){
    return this.http.post( 
      backend_uri + '/rec/application/send-rej-mails/' + eventId,  
      {
        phase: phase
      },
      { responseType: 'json' }
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

  getEventExcel(eventId: string){
    return this.http.get( 
      backend_uri + '/rec/application/event-csv/' + eventId,  
      // { responseType: 'json' }
      { responseType: 'blob' }
    )
    .pipe(
      map(res => {
        // let body = res['csvPath'];
        let body = res;
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deleteApplication(appId: string){ }
}
