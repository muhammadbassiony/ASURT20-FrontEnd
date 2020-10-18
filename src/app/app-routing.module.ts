import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaComponent } from './main system/competition/formula/formula.component';
import { RovComponent } from './main system/competition/rov/rov.component';
import { ShellComponent } from './main system/competition/shell/shell.component';
import { EverComponent } from './main system/competition/ever/ever.component';

import { LandingPageComponent } from './main system/landing-page/landing-page.component';
import { PhotorollEditComponent } from './main system/admin-panel/photoroll-edit/photoroll-edit.component';
import { SponsorsComponent } from "./main system/sponsors/sponsors.component";

import { AdminPanelComponent } from "./main system/admin-panel/admin-panel.component";
import { AddPrizesComponent } from "./main system/admin-panel/add-prizes/add-prizes.component";
import { CompetitionEditComponent } from "./main system/admin-panel/competition-edit/competition-edit.component";
import { SponsorsEditComponent } from "./main system/admin-panel/sponsors-edit/sponsors-edit.component";

import { AboutUsComponent } from "./main system/about-us/about-us.component";

import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { SignInComponent } from './authorization/sign-in/sign-in.component';
import { EditProfileComponent } from './authorization/edit-profile/edit-profile.component';
import { RequestResetComponent } from './authorization/request-reset/request-reset.component';
import { ResponseResetComponent } from './authorization/response-reset/response-reset.component';


import { AdminGuardService } from './authorization/admin-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';


import { UserApplicationComponent } from './recruitment system/applications/user-application/user-application.component';
import { NewEventComponent } from './recruitment system/applications/start-application/new-event/new-event.component';
import { SetQuestionsComponent } from './recruitment system/applications/start-application/set-questions/set-questions.component';
import { ViewSingleAppComponent } from './recruitment system/applications/view-applications/view-single-app/view-single-app.component';
import { ViewAllAppsComponent } from './recruitment system/applications/view-applications/view-all-apps/view-all-apps.component';
import { ViewAllUsersComponent } from './recruitment system/users/view-all-users/view-all-users.component';
import { ViewAllMembersComponent } from './recruitment system/users/view-all-members/view-all-members.component';

import { UserEventsComponent } from './recruitment system/dashboard/user-events/user-events.component';
import { AdminEventsComponent } from './recruitment system/dashboard/admin-events/admin-events.component';
import { ViewSingleUserComponent } from './recruitment system/users/view-single-user/view-single-user.component';

import { UserInterviewsComponent } from './recruitment system/interviews/user-interviews/user-interviews.component';
import { AdminInterviewsComponent } from './recruitment system/interviews/admin-interviews/admin-interviews.component';
import { ViewInterviewComponent } from './recruitment system/interviews/admin-interviews/view-interview/view-interview.component';

import { EditProfileDeactivateGuard } from './authorization/edit-profile/edit-profile-can-deactivate.service';



const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'competition',
     children:[

        {path: 'formula', component: FormulaComponent},
        {path: 'shell', component: ShellComponent},
        {path: 'ever', component: EverComponent},
        {path: 'rov', component: RovComponent}
    ]
  },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'about-us', component: AboutUsComponent },

  { 
    path: 'edit', component: AdminPanelComponent, 
    data: { accessLevel: 2 }, 
    canActivate: [AdminGuardService], 
    children:[
      { path: 'add-prize', component: AddPrizesComponent },
      { path: 'competition', component: CompetitionEditComponent },
      { path: 'photo-roll', component: PhotorollEditComponent },
      { path: 'sponsors', component: SponsorsEditComponent }
    ]
  },
  
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'request-reset-password', component: RequestResetComponent },
  { path: 'response-reset-password/:token', component: ResponseResetComponent },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AdminGuardService], 
    canDeactivate: [EditProfileDeactivateGuard],data: { accessLevel: 0} },

  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuardService], data: { accessLevel: 0} },
  
  {path: 'view-all-users', component: ViewAllUsersComponent, canActivate: [AdminGuardService], data: { accessLevel: 3} },
  {path: 'view-all-members', component: ViewAllMembersComponent, canActivate: [AdminGuardService], data: { accessLevel: 3} },
  {path: 'view-user', component: ViewSingleUserComponent, canActivate: [AdminGuardService], data: { accessLevel: 3} },
 
  {path: 'event/new', component: NewEventComponent, data: { accessLevel: 3} },
  {path: 'application/set-questions', component: SetQuestionsComponent, canActivate: [AdminGuardService], data: { accessLevel: 2} },
  {path: 'view-applications/:eventId', component: ViewAllAppsComponent, canActivate: [AdminGuardService] , data: { accessLevel: 2} },
  {path: 'view-application/:appId', component: ViewSingleAppComponent , canActivate: [AdminGuardService], data: { accessLevel: 2} },

  {path: 'manage-interviews', component: AdminInterviewsComponent , canActivate: [AdminGuardService], data: { accessLevel: 2} },
  {path: 'interview/:ivId', component: ViewInterviewComponent , canActivate: [AdminGuardService], data: { accessLevel: 2} },

  {path: 'application/:userId', component: UserApplicationComponent , canActivate: [AdminGuardService], data: { accessLevel: 0} },
  {path: 'book-interview/:appId', component: UserInterviewsComponent , canActivate: [AdminGuardService], data: { accessLevel: 0} },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
