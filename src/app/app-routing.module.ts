import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PhotorollEditComponent} from './landing-page/photoroll-edit/photoroll-edit.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent,pathMatch:'full'},
  {path: 'competition/:competitionName', component: CompetitionComponent},
  {path: 'edit/photo-roll', component: PhotorollEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
