import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-write-lovenote',
  templateUrl: './write-lovenote.component.html',
  styleUrls: ['./write-lovenote.component.css']
})
export class WriteLovenoteComponent implements OnInit {

  id;
  myAccount: any = {};
  recipients = [];
  displayedColumns = ['recipient', 'category', 'message'];
  noteForm: FormGroup;
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.noteForm = this.formBuilder.group({
      recipient: '',
      category: '',
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        this.myAccount = account;
        this.recipients = this.myAccount.lovedOnes;
        console.log(this.myAccount.lovedOnes);
      });
    });
  }
  goToReceivedNotes() {
    this.router.navigate([`/received-notes/${this.id}`]);
  }
  sendNote(recipient, category, message) {
    this.accountService.sendNote(this.myAccount.name, recipient, category, message).subscribe((res) => {
      console.log(res);
      const response: any = res;
      if (response.message === 'Note Created!') {
        this.goToReceivedNotes();
      }
    });
  }

}
