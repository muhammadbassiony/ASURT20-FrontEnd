import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationService} from './registration.service';
import {exhaustMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class RegistrationInterceptorService implements HttpInterceptor{
  constructor(private registrationService: RegistrationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.registrationService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modReq = req.clone({
          headers: new HttpHeaders({'Authorization': 'Bearer ' + user.token}),
          params: new HttpParams().set('auth', user.token) // FOR TESTING ON FIREBASE ONLY
        });
        return next.handle(modReq);
      })
    );
  }
}
