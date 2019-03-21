import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.scss']
})
export class NavCategoryComponent implements OnInit {

  categories;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getProductCategories()
      .subscribe(data => { this.categories = data.sort().reverse(); });
  }

}
