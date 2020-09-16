import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { FormulaComponent } from './competition/formula/formula.component';
import { RovComponent } from './competition/rov/rov.component';
import { ShellComponent } from './competition/shell/shell.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PhotorollEditComponent} from './admin-panel/photoroll-edit/photoroll-edit.component';
import {SponsorsComponent} from "./sponsors/sponsors.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent, pathMatch:'full'},

  {path: 'competition', component: CompetitionComponent, children:[
    {path:'formula',component:FormulaComponent},
    {path:'shell',component:ShellComponent},
    {path:'rov',component:RovComponent}
  ]},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'edit/photo-roll', component: PhotorollEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
