import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student1',
  templateUrl: './student1.component.html',
  styleUrls: ['./student1.component.scss'],
})
export class Student1Component implements OnInit {
  stuentArr = [
    {
      name:"张三",
      scope: 90
    },
    {
      name:"里斯",
      scope: 80
    }
  ]
  constructor() { }

  ngOnInit() {}

}
