import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-slider-multi',
  templateUrl: './slider-multi.component.html',
  styleUrls: ['./slider-multi.component.scss']
})
export class SliderMultiComponent implements OnInit {
  Products: Product[];
  sectionHeader;
  @Input() minRating;
  @Input() maxRating;
  @Input() category;
  @Input() bg;
  @Input() header;

  constructor(private data: DataService) {
  }

  ngOnInit() {

    console.log('"Init Called"');
    this.data.getProductsData()
      .subscribe(data => { this.Products = data; console.log('Products loaded'); });

    this.sectionHeader = this.header ? this.header : 'Featured ' + this.category + ' Products';
  }

}
