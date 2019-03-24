import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeUrl,
  SafeStyle
} from '@angular/platform-browser';

@Component({
  selector: 'app-slider-single',
  templateUrl: './slider-single.component.html',
  styleUrls: ['./slider-single.component.scss'],
})
export class SliderSingleComponent implements OnInit {

  promoimages = [];
  constructor(private sanitization: DomSanitizer) {
  }

  ngOnInit() {
    this.promoimages = [this.sanitization.bypassSecurityTrustStyle(
      `url('../../assets/images/banner1.jpg')`),
    this.sanitization.bypassSecurityTrustStyle(
      `url('../../assets/images/banner2.jpg')`)];
  }

}
