import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/store/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public store: Store) {}

  ngOnInit() {}
}
