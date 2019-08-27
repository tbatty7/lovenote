import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {Note} from '../../services/note.model';
import {NoteService} from '../../note.service';

@Component({
  selector: 'app-authored-notes',
  templateUrl: './authored-notes.component.html',
  styleUrls: ['./authored-notes.component.css']
})
export class AuthoredNotesComponent implements OnInit {

  id;
  myAccount: any = {};
  displayedColumns = ['name', 'category', 'message', 'actions'];
  notes: Note[];

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account: any) => {
        this.myAccount = account;
        this.getMyNotes();
      });
    });
  }

  private getMyNotes() {
    this.noteService.getNotesFrom(this.myAccount.name).subscribe((data: any) => {
      this.notes = data.notes;
      console.log(this.notes);
    });
  }

  public toNotes() {
    this.router.navigate([`/received-notes/${this.id}`]);
  }

  deleteNote(id) {
    this.noteService.deleteNote(id).subscribe(resp => {
      this.init();
    });
  }
}
