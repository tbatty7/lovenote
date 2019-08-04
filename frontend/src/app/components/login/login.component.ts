import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import { Router } from '@angular/router';
import {Account} from '../../account.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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
