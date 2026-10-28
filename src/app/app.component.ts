import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DistributorsComponent } from './components/distributors/distributors.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, MarqueeComponent, CatalogComponent, DistributorsComponent, FooterComponent],
  template: `
    <a class="sr-only" href="#nosotros">Saltar al contenido</a>
    <app-header />
    <main>
      <app-hero />
      <app-marquee />
      <app-catalog />
      <app-distributors />
    </main>
    <app-footer />
  `,
})
export class AppComponent {}
