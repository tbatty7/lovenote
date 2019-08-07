import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import { Router } from '@angular/router';
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

  logIn(user, password) {
    this.accountService.validateAccount(user, password).subscribe((data) => {
      console.log('Validating Account...');
      console.log(data);
      if (data[0] == null) {
        this.router.navigate(['/failure']);
      } else {
        this.router.navigate([`/received-notes/${data[0]._id}`]);
      }
    });
  }
}
