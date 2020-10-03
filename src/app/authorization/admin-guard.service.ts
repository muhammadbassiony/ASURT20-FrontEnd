import {
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot, 
  UrlTree} from '@angular/router';

import { Observable } from "rxjs"; 
import { UserService } from './registration.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class AdminGuardService implements CanActivate {


  constructor(private usersService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.usersService.authUser.pipe(
        take(1),
        map(user => {
          if(!user){
            //no user logged in
            return this.router.createUrlTree(['/sign-in']);
          }
          let userLevel = user.level;
          if(route.data.accessLevel && route.data.accessLevel <= userLevel){
            //users access level is equal to that of allowed by this route
            return true;
          }

          return this.router.createUrlTree(['/']);
        })
      );
      // return this.registrationService.authUser.pipe(
      //   take(1),
      //   map(user => {
      //     if (!user) {
      //       return this.router.createUrlTree(['/sign-in']);
      //     }
      //     // const isAdmin = user.level == 1;
      //     if (user.level >= 1) {
      //       return true;
      //     }
      //     return this.router.createUrlTree(['/sign-in']);
      //   })
      // );
  }
}
