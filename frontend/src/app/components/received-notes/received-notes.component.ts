import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
