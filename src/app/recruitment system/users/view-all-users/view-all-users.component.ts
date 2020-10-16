import { Component, OnInit } from '@angular/core';
import {FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  RequiredValidator, 
  FormArray} from '@angular/forms';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { User } from '../../../authorization/user.model';
import { UserService } from '../../../authorization/user.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  query: string; //search query -- dont delete
  allUsers: User[];
  filteredItems: any[];

  constructor(
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllUsers()
    .subscribe(res => {
      this.allUsers = res;
      this.assignCopy();
    })
  }

  assignCopy(){
    this.filteredItems = Object.assign([], this.allUsers);
  }

  filterItem(value: string){
    if(value===""){
      this.assignCopy();
      // console.log("FILTERED ITEMS FUNC NO INPUT :: \n", this.filteredItems);
    } // when nothing has typed
    else{
  
      this.filteredItems = Object.assign([], this.allUsers).filter(
        item => item.name && item.email && (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1  || 
                item.email.toLowerCase().indexOf(value.toLowerCase()) > -1)

      );
    }
  }

}
