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

@Component({
  selector: 'app-view-single-user',
  templateUrl: './view-single-user.component.html',
  styleUrls: ['./view-single-user.component.css']
})
export class ViewSingleUserComponent implements OnInit {

  
  team: Team;
  subT: Subteam;

  userId: string;
  user: any;
  member: any;

  userForm: FormGroup;
  allTeams: any;
  userMember: Member;
  viewAppForm: FormGroup;
  initiallyMember: boolean = false;

  isMember = false;

  optionsSubTeams :Subteam[];
  optionsTeams: Team[];

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private teamsService: TeamsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

    

  // availableSubTeams(): Subteam[] {
  //   var answer: Subteam[] = [];
  //   if (!this.allTeams) {

  //     return answer;
  //   }
  //   //console.log(this.viewAppForm.value.team);
  //   //console.log(answer)

  //   if(this.initiallyMember){
  //     answer = this.allTeams
  //       .filter(t => t.name === this.viewAppForm.value.team)[0].subteams.filter(t=> t.name!=this.subT.name);
  //   }
  //   else{
  //     answer = this.allTeams.filter(t => t.name === this.viewAppForm.value.team)[0].subteams;
  //   }

  //   return answer;
  // }


  // availableTeams(): Team[] {
    
  //   console.log("called avilable teams");
  //   var answer: Team[] = [];

  //   if (!this.allTeams) {

  //     return answer;
  //   }
  //   //console.log(this.viewAppForm.value.team);
  //   //console.log(answer)
  //   if(this.initiallyMember)
  //   answer = this.allTeams.filter(t => t.name != this.team.name);
  //   else
  //   answer = this.allTeams;

  //   return answer;
  // }

  // updateSub():void{
  //   this.team=this.viewAppForm.value.team;
  //   this.optionsTeams=this.allTeams.filter(t => t.name != this.viewAppForm.value.team);

  //   this.subT=null;
  //   this.optionsSubTeams=this.allTeams.filter(t => t.name === this.viewAppForm.value.team)[0].subteams;


  // }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    console.log('VIEW SINGLE USER - USERID :: ', this.userId);
    // this.initiallyMember = false;

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
        console.log('FETCHED USER FROM BACKEND ::\n', this.user);
        const userData = <FormGroup>this.userForm.get('userData');
        Object.keys(this.user).forEach(field => {
            if(!undesiredFields.includes(field)){
                //creates new formcontrol with the name of the field & 
                // adds it to the form with its value
                userData.addControl(field, new FormControl(this.user[field]));
            }
        });
        console.log('NEW FORM AFTER CREATION :: \n', this.userForm);

        if(this.user.member){

          this.usersService.getMember(this.user.member)
          .subscribe(res => {
            this.member = res;
            this.isMember = true;
            this.userForm.get('memberData').patchValue({ 'head': this.member.head });
            this.userForm.get('memberData').patchValue({ 'team': this.member.team._id });
            this.userForm.get('memberData').patchValue({ 'subteam': this.member.subteam._id });
            
            console.log('UPDATED MEMBER FORRRMMM ::\n', this.userForm);
          });
        }

        return this.teamsService.getAllTeams();
    }))
    .subscribe(teams => {
      this.allTeams = teams;
      // console.log('FETCHED TEAMS ::\n', this.allTeams);
      for(let t of this.allTeams){
        console.log('TEAM LLOOP ::', t.name, t._id)
      }
      
    });
      
        
    
  }
        
        

  goBack(): void {
    this.location.back();
  }

  //saveChanges(userForm){
  saveChanges(): void {

    console.log('SUBMITTT ::\n', this.isMember , this.userForm);
    // console.log("saving rn")
    // console.log(this.user);
    this.user.name = this.viewAppForm.value.name;
    this.user.email = this.viewAppForm.value.email;
    this.user.mobile = this.viewAppForm.value.mobile;
    this.user.birthDate = this.viewAppForm.value.birthDate;
    this.user.university = this.viewAppForm.value.university;
    this.user.faculty = this.viewAppForm.value.faculty;
    this.user.department = this.viewAppForm.value.department;
    this.user.graduationYear = this.viewAppForm.value.graduationYear;
    this.user.collegeId = this.viewAppForm.value.collegeId;
    this.user.emergencyContact_name = this.viewAppForm.value.emergencyContact_name;
    this.user.emergencyContact_relation = this.viewAppForm.value.emergencyContact_relation;
    this.user.emergencyContact_mobile = this.viewAppForm.value.emergencyContact_mobile;


    if (this.viewAppForm.value.teamMember && this.initiallyMember) {
      console.log("AWEL IF");
      this.userMember = {

        _id: this.user.member,
        teamId: this.allTeams.filter(t => t.name == this.viewAppForm.value.team)[0]._id,
        subteamId: this.allTeams.filter(t => t.name == this.viewAppForm.value.team)[0].subteams.filter(t => t.name == this.viewAppForm.value.subTeam)[0]._id,
        userId: this.user._id,
        head: this.viewAppForm.value.head
      }
      this.usersService.updateMember(this.userMember._id, this.userMember)
        .pipe(switchMap(res => {
          console.log('updated member :: \n', res);
          return this.usersService.addUserInfo(this.user._id, this.user);
        }))
        .subscribe(res => {
          console.log('user updated ::\n', res);
        });

    } else if (this.viewAppForm.value.teamMember && !this.initiallyMember) {
      console.log("TANY IF");
      this.userMember = {
        _id: '',
        teamId: this.allTeams.filter(t => t.name == this.viewAppForm.value.team)[0]._id,
        subteamId: this.allTeams.filter(t => t.name == this.viewAppForm.value.team)[0].subteams.filter(t => t.name == this.viewAppForm.value.subTeam)[0]._id,
        userId: this.user._id,
        head: this.viewAppForm.value.head
      };
      this.usersService.addMember(this.userMember)
        .pipe(switchMap(res => {
          console.log('added new member :: \n', res);
          return this.usersService.addUserInfo(this.user._id, this.user);
        }))
        .subscribe(res => {
          console.log('user updated ::\n', res);
        });


    } else if (!this.viewAppForm.value.teamMember && !this.initiallyMember) { // no more member
      console.log('ana hena');
      this.user.member = null;
    }
    else {
      console.log('3ADET EL IFS KOLAHA HAHA');
    }

    this.viewAppForm = new FormGroup({

      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      mobile: new FormControl(this.user.mobile, [Validators.required, Validators.maxLength(13)]),
      birthDate: new FormControl(this.user.birthDate, [Validators.required]),
      //either get the date by splitting and returning first half or return empty string if date is empty
      university: new FormControl(this.user.university, [Validators.required, Validators.maxLength(40)]),
      faculty: new FormControl(this.user.faculty, [Validators.required, Validators.maxLength(50)]),
      department: new FormControl(this.user.department, [Validators.required, Validators.maxLength(40)]),
      graduationYear: new FormControl(this.user.graduationYear, [Validators.required, Validators.maxLength(4)]),
      collegeId: new FormControl(this.user.collegeId, [Validators.required, Validators.maxLength(10)]),

      emergencyContact_name: new FormControl(this.user.emergencyContact_name, [Validators.required, Validators.maxLength(40)]),
      emergencyContact_relation: new FormControl(this.user.emergencyContact_relation, [Validators.required, Validators.maxLength(40)]),
      emergencyContact_mobile: new FormControl(this.user.emergencyContact_mobile, [Validators.required, Validators.maxLength(13)]),
      teamMember: new FormControl(this.user.member ? true : false),
      head: new FormControl(this.user.member ? this.member.head : false),
      team: new FormControl(this.member ? this.team.name : ""),
      subTeam: new FormControl(this.member ? this.subT.name : "")
    });


    //send updated user with this.usersService.updateUser
    //check here if member check box is checked and member form is filled
    //send this.userService.addMember
  }

}
