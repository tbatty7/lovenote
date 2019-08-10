import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-loved-ones',
  templateUrl: './loved-ones.component.html',
  styleUrls: ['./loved-ones.component.css']
})
export class LovedOnesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
