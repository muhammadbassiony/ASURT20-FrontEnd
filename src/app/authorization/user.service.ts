import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, throwError, Subject, from} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from './user.model';
import { AuthUser } from './authUser.model';
import { Member } from './member.model';

import { environment } from '../../environments/environment';
const backend_uri = environment.backend_uri;

export interface RegisterResponseData {
  message: string;
  user: AuthUser;
  // token: string;
}


@Injectable()
export class UserService {

  // user = new BehaviorSubject<User>(null);

  authUser = new BehaviorSubject<AuthUser>(null);

  // private decryptedToken: DecryptedToken;
  private tokenExpirationTimer: number;

  decodingHelper = new JwtHelperService();


  constructor(
    private http: HttpClient, 
    private router: Router) { }


  private handleRegistration(user: any) {
    // console.log('HANDLE REG HERE!!', user);
    const expirationDate = this.decodingHelper.getTokenExpirationDate(user.token);
    
    let authUser: AuthUser = {
      _id: user._id,
      level: user.level,
      token: user.token,
      profileComplete: user.profileComplete,
      exp: expirationDate.valueOf()
    }

    this.authUser.next(authUser);    //move to edit-profile

    this.autoLogout(expirationDate.valueOf() - Date.now().valueOf());
    localStorage.setItem('UserAuth', JSON.stringify(authUser));
    // console.log('HANDLE REG HERE!!');
  }

  signUp(email: string, password: string) {
    // console.log('USERSEVICE SIGNUP :: \n', name);
    return this.http.post<RegisterResponseData>(
      backend_uri + "/auth/user/signup", 
      {
        // name: name,
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
    pipe(
      catchError(this.handleError),
      tap((responseData) => {
        // console.log('LOGIN TAP -- EXP DATE JWTHELPER ::', responseData);
        this.handleRegistration(responseData.user);
      }));
  }


  autoSignin() {
    let user: AuthUser = JSON.parse(localStorage.getItem('UserAuth'));

    if(!user){
      return null;
    } else {
      this.authUser.next(user);
      this.autoLogout(user.exp - Date.now().valueOf());
    }
  }

  logout() {
    this.authUser.next(null);
    this.router.navigate(['/sign-in']);
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


  
  
  getAllUsers(){
    return this.http.get( backend_uri + '/auth/user/all-users', { responseType: 'json' })
    .pipe(
      map(res => {
        let body = <User[]>res['allUsers'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getUser(userId: string){
    return this.http.get( 
      backend_uri + '/auth/user/get-user/' + userId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['user'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getAllMembers(){
    return this.http.get( 
      backend_uri + '/auth/user/all-members', 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['members'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  addMember(newMember: Member){

    let member = {
      userId: newMember.userId,
      teamId: newMember.teamId,
      subteamId: newMember.subteamId,
      head: newMember.head
    };

    return this.http.post( 
      backend_uri + '/auth/user/add-member', 
      member,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Member>res['member'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
  
  getMember(memberId: string){
    return this.http.get( 
      backend_uri + '/auth/user/get-member/' + memberId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['member'];
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getTeamMembers(teamId: string){
    return this.http.get( 
      backend_uri + '/auth/user/get-team-members/' + teamId, 
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['members'];
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  updateUser(userId: string, newUser: User){

    let user = {
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
      password: newUser.password
    };


    return this.http.put( 
      backend_uri + '/auth/user/edit-user/' + userId, 
      user,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <User>res['user'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  updateMember(memberId: string, newMember: Member){
    
    let member = {
      memberId: newMember._id,
      userId: newMember.userId,
      teamId: newMember.teamId,
      subteamId: newMember.subteamId,
      head: newMember.head
    };

    return this.http.put( 
      backend_uri + '/auth/user/edit-member/' + memberId, 
      member,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <Member>res['member'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  //edit-profile -- to be changed later!
  // addUserInfo(userId: string, newUser: User, authUser: AuthUser){
  addUserInfo(userId: string, newUser: User){

    let user = {
      email: newUser.email,
      userName: newUser.name,
      password: newUser.password,
      university: newUser.university,
      mobile: newUser.mobile,
      gender: newUser.gender,
      birthdate: newUser.birthDate,
      department: newUser.department,
      faculty: newUser.faculty,
      credit: newUser.credit,
      graduationYear: newUser.graduationYear,
      collegeId: newUser.collegeId,
      emergencyContact_name: newUser.emergencyContact_name,
      emergencyContact_relation: newUser.emergencyContact_relation,
      emergencyContact_mobile: newUser.emergencyContact_mobile,
      profileComplete: newUser.profileComplete
    };

    return this.http.put( 
      backend_uri + '/auth/user/sumbit-user-info/' + userId, 
      user,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = <User>res['user'];    
        // this.authUser.next(authUser);
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deleteUser(userId: string){
    return this.http.delete(
      backend_uri + '/auth/user/delete-user/' + userId,
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
 
  deleteMember(memberId: string){
    return this.http.delete(
      backend_uri + '/auth/user/delete-member/' + memberId,
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


  requestPasswordReset(mail: string){
    return this.http.put(
      backend_uri + '/auth/user/req-reset-password',
      { email: mail },
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

  validatePasswordResetToken(token: string){
    
    return this.http.post(
      backend_uri + '/auth/user/valid-password-token',
      { token: token},
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['verified'];
        return body || [];
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  newPassword(password: string, token: string){
    let body = {
      token: token,
      password: password
    };
    
    return this.http.post(
      backend_uri + '/auth/user/new-password',
      body,
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


