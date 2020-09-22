import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import {User} from './user.model';
import {BackEndURLService} from '../services/back-end-url.service';

export interface RegisterResponseData {
  message: string;
  token: string;
}

interface DecryptedToken {
  userId: string,
  permissions: number,
  iat: number,
  exp: number
}

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient, private backEndURLService: BackEndURLService, private router: Router) {
  }
  user = new BehaviorSubject<User>(null);
  private decryptedToken: DecryptedToken;
  private tokenExpirationTimer: number;

  // ONLY FOR FIREBASE. WILL BE REPLACED WITH OUR BACKEND LOGIC
  apiKey: string = 'AIzaSyBJ5KcC8Z4SsZDF5f57d_UWG4yWf4gYjsk';


  private decryptJWTToken(JWTToken: string): DecryptedToken {
    try {
      const decodingHelper = new JwtHelperService();
      return decodingHelper.decodeToken(JWTToken);
    } catch (error) {
      return null;
    }
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post<RegisterResponseData>(this.backEndURLService.getURL() + "api/users/signup", {
      name: name,
      email: email,
      password: password,
    }).pipe(catchError(this.handleError),
      tap((responseData) => {
        this.handleRegistration(responseData.token);
      }));
  }
  signIn(email: string, password: string) {
    return this.http.post<RegisterResponseData>(this.backEndURLService.getURL() + "api/users/login", {
      email: email,
      password: password,
    }).pipe(catchError(this.handleError),
      tap((responseData) => {
        this.handleRegistration(responseData.token);
      }));
  }

  autoSign() {
    const UserData: {
      isAdmin: number
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('UserData'));
    if (!UserData) {
      return;
    }
    const loadedUser = new User(UserData.isAdmin, UserData.id, UserData._token, new Date(UserData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const UTCExpirationDate = new Date(UserData._tokenExpirationDate);
      const currentDate = new Date();
      currentDate.setUTCSeconds(0);
      this.autoLogout(UTCExpirationDate.getTime() - currentDate.getTime());
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/register/sign-up']);
    localStorage.removeItem('UserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout (expirationDuration) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }
  private handleRegistration(token: string) {
    this.decryptedToken = this.decryptJWTToken(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(this.decryptedToken.exp);
    const user = new User(this.decryptedToken.permissions, this.decryptedToken.userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout((this.decryptedToken.exp - this.decryptedToken.iat) * 1000);
    localStorage.setItem('UserData', JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse) {
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
    return throwError(errorMessage);
  }
}


