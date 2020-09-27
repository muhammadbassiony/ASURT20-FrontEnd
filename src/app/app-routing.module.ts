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


const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'competition', component: CompetitionComponent, children:[
      {path: 'formula', component: FormulaComponent},
      {path: 'shell', component: ShellComponent},
      {path: 'rov', component: RovComponent}
    ]},
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'edit', component: AdminPanelComponent, canActivate: [AdminGuardService], children:[
      { path: 'add-prize', component: AddPrizesComponent },
      { path: 'competition', component: CompetitionEditComponent },
      { path: 'photo-roll', component: PhotorollEditComponent },
      { path: 'sponsors', component: SponsorsEditComponent }
    ]},
  { path: 'about-us', component: AboutUsComponent },
  
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
