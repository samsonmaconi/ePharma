import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.scss']
})
export class NavCategoryComponent implements OnInit {

  categories = ['Prescription Meds', 'Devices', 'Personal Care', 'Treatments', 'Others'];

  constructor() { }

  ngOnInit() {
  }

}
