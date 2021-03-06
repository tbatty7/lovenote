import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {LoginDialogComponent, LoginComponent} from './components/login/login.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';
import { CreateDialogComponent, CreateAccountComponent } from './components/create-account/create-account.component';
import { ReceivedNotesComponent } from './components/received-notes/received-notes.component';
import { LovedOnesDialogComponent, LovedOnesComponent } from './components/loved-ones/loved-ones.component';
import { WriteLovenoteComponent } from './components/write-lovenote/write-lovenote.component';
import { DatabaseErrorComponent } from './components/database-error/database-error.component';
import { AuthoredNotesComponent } from './components/authored-notes/authored-notes.component';
import { AuthGuard} from './services/auth.guard';
import { AccountService} from './services/account.service';

const routes: Routes = [
  { path: 'create', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'failure', component: LoginFailureComponent },
  { path: 'received-notes', component: ReceivedNotesComponent, canActivate:
      [AuthGuard] },
  { path: 'loved-ones', component: LovedOnesComponent, canActivate:
      [AuthGuard] },
  { path: 'write-lovenote', component: WriteLovenoteComponent, canActivate:
      [AuthGuard] },
  { path: 'database-error', component: DatabaseErrorComponent },
  { path: 'authored-notes', component: AuthoredNotesComponent, canActivate:
      [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFailureComponent,
    CreateAccountComponent,
    ReceivedNotesComponent,
    LovedOnesComponent,
    WriteLovenoteComponent,
    DatabaseErrorComponent,
    LoginDialogComponent,
    CreateDialogComponent,
    LovedOnesDialogComponent,
    AuthoredNotesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [AccountService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, CreateDialogComponent, LovedOnesDialogComponent]
})
export class AppModule { }
