import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree } from '@angular/router';

import { Observable } from "rxjs";
import { UserService } from './user.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {ErrorService} from "../shared/errorModal/error.service";


@Injectable({providedIn: 'root'})
export class AdminGuardService implements CanActivate {


  constructor(private usersService: UserService, private router: Router, private errorService: ErrorService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.usersService.authUser.pipe(
        take(1),
        map(user => {
          if(!user){
            //no user logged in
            return this.router.createUrlTree(['/sign-in']);
          }


          if(!user.profileComplete && route.routeConfig.path != 'edit-profile'){
            return this.router.createUrlTree(['edit-profile']);
          }

          let userLevel = user.level;
          // console.log('AUTH GUARD HERE :: ROUTEDATA, USERLEVEL ::  ', route.routeConfig.path);
            // route.data.accessLevel, userLevel, route.data.accessLevel <= userLevel, <Boolean>route.data.accessLevel,
            // route.data.accessLevel && route.data.accessLevel <= userLevel);

          if(route.data.accessLevel!= null && route.data.accessLevel <= userLevel){
            // //users access level is equal to that of allowed by this route
            return true;
          } else if (route.data.accessLevel!= null && route.data.accessLevel > userLevel) {
            this.errorService.passError('You Can Not Access This Page!', '/home');
            return false
          }

          return this.router.createUrlTree(['/']);
        })
      );

  }
}
