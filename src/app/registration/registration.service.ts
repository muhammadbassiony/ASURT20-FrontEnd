import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from './user.model';
import { AuthUser } from './authUser.model';

import { environment } from '../../environments/environment';
const backend_uri = environment.backend_uri;

export interface RegisterResponseData {
  message: string;
  user: AuthUser;
  // token: string;
}

// interface DecryptedToken {
//   userId: string,
//   permissions: number,
//   iat: number,
//   exp: number
// }

@Injectable()
export class RegistrationService {

  user = new BehaviorSubject<User>(null);

  authUser = new BehaviorSubject<AuthUser>(null);

  // private decryptedToken: DecryptedToken;
  private tokenExpirationTimer: number;

  decodingHelper = new JwtHelperService();


  constructor(
    private http: HttpClient, 
    private router: Router) { }

  

  // ONLY FOR FIREBASE. WILL BE REPLACED WITH OUR BACKEND LOGIC
  // apiKey: string = 'AIzaSyBJ5KcC8Z4SsZDF5f57d_UWG4yWf4gYjsk';


  // private decryptJWTToken(JWTToken: string): DecryptedToken {
  //   try {
  //     return this.decodingHelper.decodeToken(JWTToken);
  //   } catch (error) {
  //     return null;
  //   }
  // }

  private handleRegistration(user: any) {
    console.log('HANDLE REG HERE!!', user);
    // this.decryptedToken = this.decryptJWTToken(token);
    // const expirationDate = new Date(0);
    // const expirationDate = this.decodingHelper.getTokenExpirationDate(token).valueOf();
    const expirationDate = this.decodingHelper.getTokenExpirationDate(user.token);
    // console.log('EXP DATE JWTHELPER ::', expirationDate, typeof(expirationDate));
    // console.log('EXP DATE DIFFERENCE ::', expirationDate.valueOf() - Date.now().valueOf());
    // expirationDate.setUTCSeconds(this.decryptedToken.exp);
    // console.log('EXP DATE EDIT ??', expirationDate.valueOf(), Date.now().valueOf());

    // const user = new User(
    //   this.decryptedToken.permissions, 
    //   this.decryptedToken.userId, 
    //   token, 
    //   expirationDate);

    let authUser: AuthUser = {
      _id: user._id,
      level: user.level,
      token: user.token,
      exp: expirationDate.valueOf()
    }

    // this.user.next(user);
    this.authUser.next(authUser);

    // this.autoLogout((this.decryptedToken.exp - this.decryptedToken.iat) * 1000);
    this.autoLogout(expirationDate.valueOf() - Date.now().valueOf());
    // localStorage.setItem('UserData', JSON.stringify(user));
    localStorage.setItem('UserAuth', JSON.stringify(authUser));
    console.log('HANDLE REG HERE!!');
  }

  signUp(name: string, email: string, password: string) {
    // console.log(name);
    return this.http.post<RegisterResponseData>(
      backend_uri + "/auth/user/signup", 
      {
        name: name,
        email: email,
        password: password,
      }
    )
    .pipe(
      catchError(this.handleError),
      tap((responseData) => {
        this.handleRegistration(responseData.user);
      })
    );
  }


  signIn(email: string, password: string) {
    return this.http.post<RegisterResponseData>(
      backend_uri + "/auth/user/login", 
      {
        email: email,
        password: password,
      }
    ).
    pipe(catchError(this.handleError),
      tap((responseData) => {
        // const expirationDate = this.decodingHelper.getTokenExpirationDate(responseData.token);
        console.log('LOGIN TAP -- EXP DATE JWTHELPER ::', responseData);
        this.handleRegistration(responseData.user);
      }));
  }


  autoSignin() {
    // const UserData: {
    //   isAdmin: number
    //   id: string;
    //   _token: string;
    //   _tokenExpirationDate: string;
    // } = JSON.parse(localStorage.getItem('UserData'));

    let user: AuthUser = JSON.parse(localStorage.getItem('UserAuth'));

    if(!user){
      return null;
    } else {
      this.authUser.next(user);
      this.autoLogout(user.exp - Date.now().valueOf());
    }


    // if (!UserData) {
    //   return;
    // }
    // const loadedUser = new User(UserData.isAdmin, UserData.id, UserData._token, new Date(UserData._tokenExpirationDate));
    // if (loadedUser.token) {
    //   this.user.next(loadedUser);
    //   const UTCExpirationDate = new Date(UserData._tokenExpirationDate);
    //   const currentDate = new Date();
    //   currentDate.setUTCSeconds(0);
    //   this.autoLogout(UTCExpirationDate.getTime() - currentDate.getTime());
    // }
  }

  logout() {
    // this.user.next(null);
    this.authUser.next(null);
    this.router.navigate(['/sign-up']);
    // localStorage.removeItem('UserData');
    localStorage.removeItem('UserAuth');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }


  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorRes);
  }

}


