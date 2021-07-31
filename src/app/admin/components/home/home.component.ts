import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'd-flex flex-grow-1'}
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
