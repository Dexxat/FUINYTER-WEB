import { Component } from '@angular/core';
import { SITE, telLink, waLink } from '../../data/site';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly site = SITE;
  readonly whatsapp = waLink();
  readonly year = new Date().getFullYear();
  readonly tel = telLink;
}
