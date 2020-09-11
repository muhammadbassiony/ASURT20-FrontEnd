import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { FormulaComponent } from './competition/formula/formula.component';
import { RovComponent } from './competition/rov/rov.component';
import { ShellComponent } from './competition/shell/shell.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PhotorollEditComponent} from './landing-page/photoroll-edit/photoroll-edit.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent,pathMatch:'full'},

  {path: 'competition', component: CompetitionComponent,children:[
    {path:'formula',component:FormulaComponent},
    {path:'shell',component:ShellComponent},
    {path:'rov',component:RovComponent}
  ]},
  
  {path: 'edit/photo-roll', component: PhotorollEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
