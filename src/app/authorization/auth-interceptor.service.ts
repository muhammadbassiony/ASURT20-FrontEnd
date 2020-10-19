import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { exhaustMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private usersService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return this.registrationService.user.pipe(
    return this.usersService.authUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modReq = req.clone({
          headers: new HttpHeaders({'Authorization': ' Bearer ' + user.token}),
        });
        return next.handle(modReq);
      })
    );

  }
}
