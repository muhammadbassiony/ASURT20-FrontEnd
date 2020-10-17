import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Event } from '../models/event.model';
import { Team } from '../models/team.model'; 


import { environment } from '../../../environments/environment';
const backend_uri = environment.backend_uri;

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  private teams: Team[];
  private events: Event[];
  
  constructor(private http: HttpClient) {}

  getAllEvents(){
    return this.http.get( backend_uri + '/rec/event/all-events', { responseType: 'json' })
    .pipe(
      map(res => {
        let body = <Event[]>res['events'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  getEvent(eventId: string){
    return this.http.get(
      backend_uri + '/rec/event/get-event/' + eventId,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        // console.log('events service get event', res['event']);
        let body = <Event>res['event'];    
        return body || [];  
      })
      ,
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  addNewEvent(newEvent: Event){
    // console.log('hereee::\n', {...newEvent});
    return this.http.post( 
      backend_uri + '/rec/event/add-event', 
      { ...newEvent }, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event[]>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  
  updateEvent(eventId: string, newEvent: any){
    // console.log("EVENTS-SERVICE :: updating event ::\n", newEvent);
    
    let updatedEvent = {
      teamId: newEvent.team,
      season: newEvent.season,
      eventActive: newEvent.eventActive,
      questions: newEvent.questions,
      activeSubteams: newEvent.activeSubteams,
      currentPhase: newEvent.currentPhase
    };

    return this.http.put( 
      backend_uri + '/rec/event/update-event/' + eventId, 
      updatedEvent , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  toggleEventStatus(eventId: string){
    //if already active then deactivates and vice versa
    return this.http.put( 
      backend_uri + '/rec/event/edit-event-status/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  incrementNumApplicants(eventId: string){
    return this.http.put( 
      backend_uri + '/rec/event/increment-event-applicants/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  incrementNumAccepted(eventId: string){
    return this.http.put( 
      backend_uri + '/rec/event/increment-num-acc/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  incrementNumRejected(eventId: string){
    return this.http.put( 
      backend_uri + '/rec/event/increment-num-rej/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  incrementNumPendAcc(eventId: string){
    return this.http.put( 
      backend_uri + '/rec/event/increment-num-pendacc/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  incrementNumPendRej(eventId: string){
    return this.http.put( 
      backend_uri + '/rec/event/increment-num-pendrej/' + eventId, 
      null , 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Event>res['event'];  
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  deleteEvent(eventId: string){
    return this.http.delete(
      backend_uri + '/rec/event/delete-event/' + eventId,
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



}
