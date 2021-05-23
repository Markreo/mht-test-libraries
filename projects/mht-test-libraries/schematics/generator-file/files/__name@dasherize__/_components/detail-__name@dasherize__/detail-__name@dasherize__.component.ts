import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-<%= dasherize(name) %>',
  templateUrl: './detail-<%= dasherize(name) %>.component.html',
  styleUrls: ['./detail-<%= dasherize(name) %>.component.css']
})
export class Detail<%= classify(name) %>Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
