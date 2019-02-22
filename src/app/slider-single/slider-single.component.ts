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

  promoimages = [this.sanitization.bypassSecurityTrustStyle(
    `url('https://www.m-medix.com/modules/homeslider/images/84e5d282edcd5febda7d5e46cfadce1f91724100_Vitamin%20C2.jpg')`),
  this.sanitization.bypassSecurityTrustStyle(
    `url('https://www.m-medix.com/modules/homeslider/images/5b13b9c3158712bb4b3dd30ba56fe02264f142a3_GAVISCON%20PEPPERMINT.png')`)];

  constructor(private sanitization: DomSanitizer) {
  }

  ngOnInit() {
  }

}
