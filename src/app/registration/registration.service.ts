import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';

export interface RegisterResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient, private router: Router) {
  }
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: number;
  // ONLY FOR FIREBASE. WILL BE REPLACED WITH OUR BACKEND LOGIC
  apiKey: string = 'AIzaSyBJ5KcC8Z4SsZDF5f57d_UWG4yWf4gYjsk';


  signUp(name: string, email: string, password: string) {
    return this.http.post<RegisterResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap((responseData) => {
        this.handleRegistration(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
    }));
  }
  signIn(email: string, password: string) {
    return this.http.post<RegisterResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap((responseData) => {
        this.handleRegistration(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      }));
  }

  autoSign() {
    const UserData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('UserData'));
    if (!UserData) {
      return;
    }
    const loadedUser = new User(UserData.email, UserData.id, UserData._token, new Date(UserData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime());
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
  private handleRegistration(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
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

