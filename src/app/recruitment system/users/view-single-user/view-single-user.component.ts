import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  RequiredValidator,
  FormArray
} from '@angular/forms';
import { Location } from '@angular/common';


import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';


import { UserService } from '../../../authorization/user.service';
import { TeamsService } from '../../services/teams.service';
import { Member } from '../../../authorization/member.model';
import { User } from '../../../authorization/user.model';
import { Team } from '../../models/team.model';
import { Subteam } from '../../models/subteam.model';
import {ErrorService} from "../../../shared/errorModal/error.service";

@Component({
  selector: 'app-view-single-user',
  templateUrl: './view-single-user.component.html',
  styleUrls: ['./view-single-user.component.css']
})
export class ViewSingleUserComponent implements OnInit {


  userId: string;
  user: any;
  member: any;

  userForm: FormGroup;
  allTeams: any;
  // userMember: Member;
  // viewAppForm: FormGroup;
  // initiallyMember: boolean = false;

  isMember = false;
  currentTeam;
  currentSub;
  availableSubs;

  optionsSubTeams :Subteam[];
  optionsTeams: Team[];

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private teamsService: TeamsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private location: Location) { }



  updateSub(): void{
    if (this.allTeams) {
      this.availableSubs = this.allTeams
        .find(t => t._id == this.userForm.get('memberData')['controls'].team.value)['subteams'];
    }
  }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');

    this.userForm = this.fb.group({
      'userData': this.fb.group({}),
      'memberData': this.fb.group({
        'head': [],
        'team': [],
        'subteam': []
      })
    });

    //fields that will not be displayed for change
    const undesiredFields = ['_id', '__v', 'updatedAt', 'createdAt', 'password', 'profileComplete'];

    this.usersService.getUser(this.userId)
    .pipe(
      concatMap(res => {
        this.user = res;
        // console.log('FETCHED USER FROM BACKEND ::\n', this.user);
        const userData = <FormGroup>this.userForm.get('userData');
        Object.keys(this.user).forEach(field => {
            if(!undesiredFields.includes(field)){
                //creates new formcontrol with the name of the field &
                // adds it to the form with its value
                userData.addControl(field, new FormControl(this.user[field]));
            }
        });
        // console.log('NEW FORM AFTER CREATION :: \n', this.userForm);

        if(this.user.member){

          this.usersService.getMember(this.user.member)
          .subscribe(res => {
            this.member = res;
            this.isMember = true;
            this.userForm.get('memberData').patchValue({ 'head': this.member.head });
            this.userForm.get('memberData').patchValue({ 'team': this.member.team._id });
            this.userForm.get('memberData').patchValue({ 'subteam': this.member.subteam._id });
            this.currentTeam = this.member.team.name;
            this.currentSub = this.member.subteam.name;
            // console.log('UPDATED MEMBER FORRRMMM ::\n', this.member, this.userForm);
            this.updateSub();
          }, (error) => {
            this.errorService.passError('Error Getting User Info!', '/dashboard');
          });
        }

        return this.teamsService.getAllTeams();
    }))
    .subscribe(teams => {
      this.allTeams = teams;
      // console.log('FETCHED TEAMS ::\n', this.allTeams);
      this.updateSub();
    }, (error) => {
      this.errorService.passError('Error Getting User Info!', '/dashboard');
    });

    // this.updateSub();


  }



  goBack(): void {
    this.location.back();
  }

  //saveChanges(userForm){
  saveChanges(): void {

    let updatedUser = <User>this.user;
    updatedUser = {...this.user, ...this.userForm.value.userData };

    let updatedMember = <Member>this.member;
    updatedMember = {...this.member, ...this.userForm.value.memberData};
    

    this.usersService.addUserInfo(this.userId, updatedUser)
    .pipe(switchMap(res => {
      if(this.user.member) {
        return this.usersService.updateMember(this.user.member, updatedMember);
      } else {
        updatedMember.userId = this.user._id;
        return this.usersService.addMember(updatedMember);
      }
    }))
    .subscribe(res => {
      alert('succesfully updated!')
    }, (error) => {
      this.errorService.passError('Error Updating Info!', '/dashboard');
    });


  }

}
