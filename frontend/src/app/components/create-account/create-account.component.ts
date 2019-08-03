import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
