import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-loved-ones',
  templateUrl: './loved-ones.component.html',
  styleUrls: ['./loved-ones.component.css']
})
export class LovedOnesComponent implements OnInit {
  id;
  myAccount: any = {};
  displayedColumns = ['title'];
  addlovedonesForm: FormGroup;

  constructor( private accountService: AccountService,
               private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router) {
    this.addlovedonesForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    const accountString = localStorage.getItem('account');
    this.id = JSON.parse(accountString).id;
    this.accountService.getAccount(this.id).subscribe((account) => {
      this.myAccount = account;
      console.log(this.myAccount.lovedOnes);
    });
  }

  addLovedOne(name) {
    this.accountService.hasAccount(name).subscribe((resp) => {
      const lovedOne: any = resp;
      if (lovedOne.exists === true) {
        this.accountService.addLovedOne(name, this.id).subscribe((response) => {
          if (response === 'Update done') {
            this.router.navigate([`/received-notes`]);
          } else {
            console.log(`ERROR ADDING LOVED ONE!! OH NOO!! - ${response}`);
            this.router.navigate(['/not-found']);
          }
        });
      } else {
        console.log('loved one does not have an account');
        this.router.navigate([`/not-found/${this.id}`]);
      }
    });
  }

  goToReceivedNotes() {
    this.router.navigate(['/received-notes']);
  }

}
