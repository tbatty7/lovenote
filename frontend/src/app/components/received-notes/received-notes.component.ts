import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  id;
  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        console.log(account);
      });
    });
  }

}
