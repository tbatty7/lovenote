import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LoginDialogComponent} from '../login/login.component';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-loved-ones',
  templateUrl: './loved-ones.component.html',
  styleUrls: ['./loved-ones.component.css']
})
export class LovedOnesComponent implements OnInit {
  id;
  myAccount: any = {};
  displayedColumns = ['title'];
  addlovedonesForm: FormGroup;

  constructor( private accountService: AccountService,
               private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private dialog: MatDialog) {
    this.addlovedonesForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    const accountString = localStorage.getItem('account');
    this.id = JSON.parse(accountString).id;
    this.accountService.getAccount(this.id).subscribe((account) => {
      this.myAccount = account;
    });
  }

  addLovedOne(name) {
    this.accountService.hasAccount(name).subscribe((resp) => {
      const lovedOne: any = resp;
      if (lovedOne.exists === true) {
        this.accountService.addLovedOne(name, this.id).subscribe((response) => {
          if (response === 'Update done') {
            this.openDialog(name + ' has been added to your loved ones.');
            this.goToReceivedNotes();
          } else {
            console.log(`ERROR ADDING LOVED ONE!! OH NOO!! - ${response}`);
            this.openDialog('There was a problem with the database, please try again');
          }
        });
      } else {
        console.log('loved one does not have an account');
        this.openDialog('There is no account under the name of ' + name);
      }
    });
  }

  goToReceivedNotes() {
    this.router.navigate(['/received-notes']);
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
export class LovedOnesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LovedOnesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  exit(): void {
    this.dialogRef.close();
  }

}
