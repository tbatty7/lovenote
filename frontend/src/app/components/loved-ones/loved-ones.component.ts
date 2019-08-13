import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../account.service';
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

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.addlovedonesForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.accountService.getAccount(this.id).subscribe((account) => {
        this.myAccount = account;
        console.log(this.myAccount.lovedOnes);
      });
    });
  }

  addLovedOne(name) {
    this.accountService.hasAccount(name).subscribe((resp) => {
      console.log(resp);
      const lovedOne: any = resp;
      if (lovedOne.exists === true) {
        this.accountService.addLovedOne(name, this.id).subscribe((response) => {
          console.log(response);
          if (response === 'Update done') {
            this.router.navigate([`/received-notes/${this.id}`]);
          } else {
            console.log(`ERROR ADDING LOVED ONE!! OH NOO!! - ${response}`);
            this.router.navigate(['/not-found']);
          }
        });
      } else {
        console.log('loved one does not have an account');
      }
    });
  }

  goToReceivedNotes() {
    this.router.navigate([`/received-notes/${this.id}`]);
  }

}
