import {Component, Inject, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData, LoginDialogComponent} from '../login/login.component';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createForm: FormGroup;
  hide = true;

  constructor(private accountService: AccountService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createAccount(name, password) {
    this.accountService.hasAccount(name).subscribe(resp => {
      const account: any = resp;
      if (account.exists === false) {
        this.accountService.createAccount(name, password).subscribe(res => {
          console.log(res);
          const response: any = res;
          if (response.message === 'Account Created Successfully!') {
            this.openDialog(response.message + '  Please log in.');
            this.router.navigate(['/login']);
          } else {
            console.log(res);
            this.router.navigate(['/database-error']);
          }
        });
      } else {
        this.openDialog('Sorry, that name is already in use.  Please try another name');
      }
    });
  }

  ngOnInit() {
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
  templateUrl: '../login/dialog-overview-example-dialog.html',
  styleUrls: ['../login/login.component.css']
})
export class CreateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  exit(): void {
    this.dialogRef.close();
  }

}
