import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {RegistrationService} from '../registration/registration.service';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AdminGuardService implements CanActivate {
  constructor(private registrationService: RegistrationService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.registrationService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/register/sign-in']);
        }
        const isAdmin = user.isAdmin == 1;
        if (isAdmin) {
          return true;
        }
        return this.router.createUrlTree(['/register/sign-in']);
      })
      );

  }
}
