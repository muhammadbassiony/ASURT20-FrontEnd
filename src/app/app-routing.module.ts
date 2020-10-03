import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetitionComponent } from './main system/competition/competition.component';
import { FormulaComponent } from './main system/competition/formula/formula.component';
import { RovComponent } from './main system/competition/rov/rov.component';
import { ShellComponent } from './main system/competition/shell/shell.component';

import { LandingPageComponent } from './main system/landing-page/landing-page.component';
import { PhotorollEditComponent } from './main system/admin-panel/photoroll-edit/photoroll-edit.component';
import { SponsorsComponent } from "./main system/sponsors/sponsors.component";

import { AdminPanelComponent } from "./main system/admin-panel/admin-panel.component";
import { AddPrizesComponent } from "./main system/admin-panel/add-prizes/add-prizes.component";
import { CompetitionEditComponent } from "./main system/admin-panel/competition-edit/competition-edit.component";
import { SponsorsEditComponent } from "./main system/admin-panel/sponsors-edit/sponsors-edit.component";

import { AboutUsComponent } from "./main system/about-us/about-us.component";

import { SignUpComponent } from './registration/sign-up/sign-up.component';
import { SignInComponent } from './registration/sign-in/sign-in.component';

import {AdminGuardService} from './registration/admin-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';


import { UserApplicationComponent } from './recruitment system/applications/user-application/user-application.component';
import { NewEventComponent } from './recruitment system/applications/start-application/new-event/new-event.component';
import { SetQuestionsComponent } from './recruitment system/applications/start-application/set-questions/set-questions.component';
import { ViewSingleAppComponent } from './recruitment system/applications/view-applications/view-single-app/view-single-app.component';
import { ViewAllAppsComponent } from './recruitment system/applications/view-applications/view-all-apps/view-all-apps.component';
import { ViewAllUsersComponent } from './recruitment system/users/view-all-users/view-all-users.component';
import { UserEventsComponent } from './recruitment system/dashboard/user-events/user-events.component';
import { AdminEventsComponent } from './recruitment system/dashboard/admin-events/admin-events.component';
import { ViewSingleUserComponent } from './recruitment system/users/view-single-user/view-single-user.component';

import { UserInterviewsComponent } from './recruitment system/interviews/user-interviews/user-interviews.component';
import { AdminInterviewsComponent } from './recruitment system/interviews/admin-interviews/admin-interviews.component';
import { ViewInterviewComponent } from './recruitment system/interviews/admin-interviews/view-interview/view-interview.component';




const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'competition', component: CompetitionComponent,
     children:[

        {path: 'formula', component: FormulaComponent},
        {path: 'shell', component: ShellComponent},
        {path: 'rov', component: RovComponent}
    ]
  },
  { path: 'sponsors', component: SponsorsComponent },
  { 
    path: 'edit', component: AdminPanelComponent, 
    data: { accessLevel: 2}, 
    canActivate: [AdminGuardService], 
    children:[
      { path: 'add-prize', component: AddPrizesComponent },
      { path: 'competition', component: CompetitionEditComponent },
      { path: 'photo-roll', component: PhotorollEditComponent },
      { path: 'sponsors', component: SponsorsEditComponent }
    ]
  },
  { path: 'about-us', component: AboutUsComponent },
  
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent , data: { accessLevel: 0} },
  
  {path: 'view-all-users', component: ViewAllUsersComponent , data: { accessLevel: 3} },
  {path: 'view-user', component: ViewSingleUserComponent , data: { accessLevel: 3} },

  {path: 'event/new', component: NewEventComponent , data: { accessLevel: 3} },
  {path: 'application/set-questions', component: SetQuestionsComponent , data: { accessLevel: 2} },
  {path: 'view-applications/:eventId', component: ViewAllAppsComponent , data: { accessLevel: 2} },
  {path: 'view-application/:appId', component: ViewSingleAppComponent , data: { accessLevel: 2} },

  {path: 'manage-interviews', component: AdminInterviewsComponent , data: { accessLevel: 2} },
  {path: 'interview/:ivId', component: ViewInterviewComponent , data: { accessLevel: 2} },

  {path: 'application/:userId', component: UserApplicationComponent , data: { accessLevel: 0} },
  {path: 'book-interview/:appId', component: UserInterviewsComponent , data: { accessLevel: 0} },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
