import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatTableModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule} from '@angular/material';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ReceivedNotesComponent } from './components/received-notes/received-notes.component';

import { AccountService} from './account.service';
import { LovedOnesComponent } from './components/loved-ones/loved-ones.component';

const routes: Routes = [
  { path: 'create', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'failure', component: LoginFailureComponent },
  { path: 'received-notes/:id', component: ReceivedNotesComponent },
  { path: 'loved-ones/:id', component: LovedOnesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFailureComponent,
    CreateAccountComponent,
    ReceivedNotesComponent,
    LovedOnesComponent
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
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
