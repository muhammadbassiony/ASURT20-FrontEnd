import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import { UserService } from '../user.service';


@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  isLoading = true;
  tokenId: string;
  passwordResetForm: FormGroup;
  confirmPassword: string;

  constructor(
    private usersService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tokenId = this.route.snapshot.paramMap.get('token');
    console.log('TOKEENNNNN PASS RESET RESPONSE', this.tokenId);
    this.usersService.validatePasswordResetToken(this.tokenId)
    .subscribe(res => {
      console.log('TOKEENNNNN PASS RESET RESPONSE', this.tokenId);
      this.isLoading = false;
    });

    this.passwordResetForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }


  onSubmit(passwordResetForm: FormGroup){
    this.usersService.newPassword(this.passwordResetForm.value.password, this.tokenId)
    .subscribe(res => {
      this.router.navigate(['/sign-in']);
    })
  }

}
