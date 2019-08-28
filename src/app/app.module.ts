import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatTableModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ReceivedNotesComponent } from './components/received-notes/received-notes.component';
import { LovedOnesComponent } from './components/loved-ones/loved-ones.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WriteLovenoteComponent } from './components/write-lovenote/write-lovenote.component';
import { CreateAccountFailureComponent } from './components/create-account-failure/create-account-failure.component';
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
  { path: 'not-found', component: NotFoundComponent },
  { path: 'write-lovenote/:id', component: WriteLovenoteComponent, canActivate:
      [AuthGuard] },
  { path: 'create-account-failure', component: CreateAccountFailureComponent },
  { path: 'database-error', component: DatabaseErrorComponent },
  { path: 'authored-notes/:id', component: AuthoredNotesComponent, canActivate:
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
    NotFoundComponent,
    WriteLovenoteComponent,
    CreateAccountFailureComponent,
    DatabaseErrorComponent,
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
    MatSnackBarModule
  ],
  providers: [AccountService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
