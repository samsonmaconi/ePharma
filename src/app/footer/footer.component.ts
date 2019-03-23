import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  pitch =
    'Your trusted online pharmacy for certified pharmaceutical grade medications and supplies within the Halifax Municipal Area. Established in 2019';
  tel = '+1 (902) 580-6278';
  address = '999 South Street, Halifax, B2A 1S9';
  email = 'info@epharmagroup.com';

  constructor() {}

  ngOnInit() {}
}
