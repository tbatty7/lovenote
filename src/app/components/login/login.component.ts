import {Component, Inject, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  authenticate(name, password) {
    const account = {
      name,
      password
    };
    this.accountService.authenticateAccount(account)
      .subscribe(res => {
        const data: any = res;
        if (data.success) {
          this.accountService.storeUserData(data.token, data.account);
          this.router.navigate(['/received-notes']);
        } else {
          console.log('Error message when authenticating: ' + data.msg);
          this.openDialog(data.msg);
          this.router.navigate(['/failure']);
        }
      });
  }

  openDialog(errorMessage): void {
    this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {message: errorMessage}
    });
  }
}
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  exit(): void {
    this.dialogRef.close();
  }

}
