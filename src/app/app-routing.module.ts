import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { FormulaComponent } from './competition/formula/formula.component';
import { RovComponent } from './competition/rov/rov.component';
import { ShellComponent } from './competition/shell/shell.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PhotorollEditComponent} from './admin-panel/photoroll-edit/photoroll-edit.component';
import {SponsorsComponent} from "./sponsors/sponsors.component";
<<<<<<< HEAD

const routes: Routes = [
  {path: '', component: LandingPageComponent, pathMatch:'full'},

  {path: 'competition', component: CompetitionComponent, children:[
    {path:'formula',component:FormulaComponent},
    {path:'shell',component:ShellComponent},
    {path:'rov',component:RovComponent}
  ]},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'edit/photo-roll', component: PhotorollEditComponent}
=======
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AddPrizesComponent} from "./admin-panel/add-prizes/add-prizes.component";
import {CompetitionEditComponent} from "./admin-panel/competition-edit/competition-edit.component";
import {SponsorsEditComponent} from "./admin-panel/sponsors-edit/sponsors-edit.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {RegistrationComponent} from './registration/registration.component';
import {SignUpComponent} from './registration/sign-up/sign-up.component';
import {SignInComponent} from './registration/sign-in/sign-in.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent, pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'competition', component: CompetitionComponent, children:[
      {path: 'formula', component: FormulaComponent},
      {path: 'shell', component: ShellComponent},
      {path: 'rov', component: RovComponent}
    ]},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'edit', component: AdminPanelComponent, children:[
      {path: 'add-prize', component: AddPrizesComponent},
      {path: 'competition', component: CompetitionEditComponent},
      {path: 'photo-roll', component: PhotorollEditComponent},
      {path: 'sponsors', component: SponsorsEditComponent}
    ]},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'register', component: RegistrationComponent, children:[
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent}
    ]}
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
