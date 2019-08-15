import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  id;
  myAccount: any = {};
  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        this.myAccount = account;
      });
    });
  }

  toLovedOnes() {
    this.router.navigate([`/loved-ones/${this.id}`]);
  }

  toWriteLoveNote() {
    this.router.navigate([`/write-lovenote/${this.id}`]);
  }

}
