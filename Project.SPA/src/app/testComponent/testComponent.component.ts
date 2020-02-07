import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testComponent',
  templateUrl: './testComponent.component.html',
  styleUrls: ['./testComponent.component.css'],


})
export class TestComponentComponent implements OnInit {
  name: string = '';

  ngOnInit(): void { }



  setValue() {
    this.name = 'Nancy';
  }

}
