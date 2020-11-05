import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { ListViewComponent } from './list-view/list-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiServices } from "./services/apiService";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [
    AppComponent,
    CreateInterviewComponent,
    ListViewComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
