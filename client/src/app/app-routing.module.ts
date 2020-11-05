import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from "./list-view/list-view.component"
import { CreateInterviewComponent } from "./create-interview/create-interview.component"
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'upcomingInterview', component: ListViewComponent },
  { path: 'createInterview', component: CreateInterviewComponent },
  { path: '', component: WelcomeComponent },
  { path: 'home', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
