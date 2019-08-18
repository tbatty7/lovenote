import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../account.service';
import {Account} from '../../account.model';
import {Note} from "../../note.model";

@Component({
  selector: 'app-authored-notes',
  templateUrl: './authored-notes.component.html',
  styleUrls: ['./authored-notes.component.css']
})
export class AuthoredNotesComponent implements OnInit {

  id;
  myAccount: any = {};
  displayedColumns = ['name', 'category', 'message'];
  notes: Note[];

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account: any) => {
        this.myAccount = account;
        this.getMyNotes();
      });
    });
  }

  private getMyNotes() {
    console.log('implement getMyNotes() method');
  }

  private toNotes() {
    this.router.navigate([`/received-notes/${this.id}`]);
  }
}
