import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Note} from '../../note.model';
import {NoteService} from '../../note.service';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  id;
  myAccount: any = {};
  notes: Note[];
  displayedColumns = ['name', 'category', 'message', 'actions'];
  constructor(private accountService: AccountService, private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        this.myAccount = account;
        this.getNotes();
      });
    });
  }

  toLovedOnes() {
    this.router.navigate([`/loved-ones/${this.id}`]);
  }

  toWriteLoveNote() {
    this.router.navigate([`/write-lovenote/${this.id}`]);
  }

  getNotes() {
    this.noteService.getNotesFor(this.myAccount.name).subscribe( (data: any) => {
      this.notes = data.notes;
      console.log(this.notes);
    });
  }

  deleteNote(id) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.init();
    });
  }

  toMyNotes() {
    this.router.navigate([`/authored-notes/${this.id}`]);
  }
}