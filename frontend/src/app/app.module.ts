import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ReceivedNotesComponent } from './components/received-notes/received-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFailureComponent,
    CreateAccountComponent,
    ReceivedNotesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
