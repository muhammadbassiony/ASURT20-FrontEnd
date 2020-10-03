import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  isLoading = false;
  userId: string;
  profileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log('EDIT PROFILE USERID :: ', this.userId);
  }

  onSubmit(profileForm: FormGroup){
    console.log('EDIT PROFILE FORM :: \n', this.profileForm);
  }
}
