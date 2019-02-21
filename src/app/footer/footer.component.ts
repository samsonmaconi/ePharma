import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  pitch = 'The trusted online pharmacy for... Voluptate fugiat labore consectetur Lorem.' +
  'Consectetur non dolor enim id ex dolor. Eu labore voluptate elit fug';
  tel = '+1 (902) 580-6278';
  address = '999 South Street, Halifax, B2A 1S9';
  email = 'info@epharmagroup.com';

  constructor() { }

  ngOnInit() {
  }

}
