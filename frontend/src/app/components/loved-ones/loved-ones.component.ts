import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-loved-ones',
  templateUrl: './loved-ones.component.html',
  styleUrls: ['./loved-ones.component.css']
})
export class LovedOnesComponent implements OnInit {
  id;
  myAccount: any = {};
  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        this.myAccount = account;
        console.log(this.myAccount.lovedOnes);
      });
    });
  }

}
