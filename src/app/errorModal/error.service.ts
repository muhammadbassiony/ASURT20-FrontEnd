import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  ErrorCaught = new Subject<{ ErrorMsg: string; Url: string }>();

//this function is called when we found an error then it takes the error msg and redirect url to redirect to 
// u can redirect to the same page   
  passError(error: string, url: string) {
    this.ErrorCaught.next({ ErrorMsg: error, Url: url });
  }
}
