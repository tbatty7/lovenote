import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createForm: FormGroup;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createAccount(name, password) {
        this.accountService.createAccount(name, password).subscribe(() => {
          this.router.navigate(['/login']);
        });
      }

  ngOnInit() {
  }

}
