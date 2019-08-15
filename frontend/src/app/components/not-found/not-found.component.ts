import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  id;
  constructor(private router: Router, private route: ActivatedRoute) { }

  back() {
    this.router.navigate([`/received-notes/${this.id}`]);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

}
