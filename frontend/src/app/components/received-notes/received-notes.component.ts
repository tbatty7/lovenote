import { Component, OnInit } from '@angular/core';
import { AccountService} from '../../account.service';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  id = '5d45cca4bd3d86307cb17d5a';
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccount(this.id).subscribe((account) => {
      console.log(account);
    });
  }

}
