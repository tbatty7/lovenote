import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) {
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
          this.router.navigate(['/failure']);
        }
      });
  }
}
