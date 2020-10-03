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

import { InterviewStatus } from '../models/interview-status-enum.model';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewsService {

  private interviews: Interview[];

  constructor(private http: HttpClient) {}


  getAllInterviews(){
    return this.http.get( backend_uri + '/rec/interview/all-intrvs', { responseType: 'json' })
    .pipe(
      map(res => {
        let body = res['interviews'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getEventInterviews(eventId: string){
    return this.http.get( 
      backend_uri + '/rec/interview/event-intrvs/' + eventId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['interviews'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getInterview(ivId: string){
    return this.http.get( 
      backend_uri + '/rec/interview/get-intrv/' + ivId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['interview'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  addNewInterview(intrv: any){
    
    let iv = {
      start: intrv.start,
      end: intrv.end,
      title: intrv.title,
      url: intrv.url,
      backgroundColor: intrv.backgroundColor,
      eventId: intrv.eventId
    };

    return this.http.post( 
      backend_uri + '/rec/interview/add-new-intrv', 
      iv,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['interview'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getAvailableDates(){
    return this.http.get( 
      backend_uri + '/rec/interview/free-dates', 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['availableDates'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  

  updateInterview(ivId: string, newIv: Interview){
    
    let iv = {
      start: newIv.start,
      end: newIv.end,
      title: newIv.title,
      url: newIv.url,
      backgroundColor: newIv.backgroundColor,
      extendedProps: newIv.extendedProps
    };

    return this.http.put( 
      backend_uri + '/rec/interview/update-intrv/' + ivId, 
      iv,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['interview'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deleteInterview(ivId: string){
    return this.http.delete(
      backend_uri + '/rec/interview/delete-intrv/' + ivId,
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
