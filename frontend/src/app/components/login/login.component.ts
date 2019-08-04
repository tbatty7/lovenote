import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import { Router } from '@angular/router';
import {Account} from '../../account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  createAccount() {
    this.router.navigate([`/create`]);
  }

  logIn(user, password) {
    this.accountService.validateAccount(user, password).subscribe((data: Account) => {
      this.router.navigate([`/received-notes/${data.id}`]);
    });
  }
}
