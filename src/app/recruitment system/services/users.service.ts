import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
const backend_uri = environment.backend_uri;

import { User } from '../../authorization/user.model';
import { Team } from '../models/team.model';
import { Member } from '../../authorization/member.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private teams: Team[];
  private users: User[];
  
  constructor(private http: HttpClient) {}

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

  // addNewUser(newUser: User){

  //   let user = {
  //     email: newUser.email,
  //     name: newUser.name,
  //     password: newUser.password
  //   };

  //   return this.http.post( 
  //     backend_uri + '/auth/user/add-user', 
  //     user,
  //     { responseType: 'json' }
  //   )
  //   .pipe(
  //     map(res => {
  //       let body = <User>res['user'];    
  //       return body || [];    
  //     }),
  //     catchError(errorRes => {
  //       return throwError(errorRes);
  //     })
  //   );
  // }

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
      emergencyContact_mobile: newUser.emergencyContact_mobile
    };

    return this.http.put( 
      backend_uri + '/auth/user/sumbit-user-info/' + userId, 
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


}
