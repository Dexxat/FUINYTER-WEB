import { Component } from '@angular/core';
import { SITE } from '../../data/site';

interface CategoryTile {
  title: string;
  text: string;
  href: string;
  image: string;
  alt: string;
  /** Clase de ubicación en la grilla */
  layout: 't-exterior' | 't-colgantes' | 't-apliques' | 't-tortugas';
  /** Producto recortado sobre fondo blanco en vez de foto ambientada */
  cutout?: boolean;
  swatches?: string[];
}

const ML = 'https://listado.mercadolibre.com.ar/iluminacion-fuinyter';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  readonly ml = SITE.mercadoLibre;
  readonly pdf = SITE.catalogPdf;

  readonly tiles: CategoryTile[] = [
    {
      title: 'Faroles y apliques de exterior',
      text: 'Venezia, Siena, Colonial y Bari. Policarbonato con filtro UV, IP44.',
      href: `${ML}-farol`, image: 'assets/img/farol-exterior.webp', layout: 't-exterior',
      alt: 'Farol de pared negro encendido junto a la entrada de una casa',
    },
    {
      title: 'Colgantes de interior',
      text: 'Trini, Sigma y Globit, en cinco terminaciones mate.',
      href: `${ML}-colgante`, image: 'assets/img/colgantes.webp', layout: 't-colgantes', cutout: true,
      alt: 'Cinco colgantes de interior en verde, petróleo, arena, marrón y negro',
      swatches: ['var(--sage)', 'var(--teal)', 'var(--sand)', 'var(--umber)', '#2B2E31'],
    },
    {
      title: 'Apliques y módulos LED',
      text: 'Proyectores, campanas y repuestos.',
      href: `${ML}-aplique-led`, image: 'assets/img/aplique-led.webp', layout: 't-apliques',
      alt: 'Aplique LED rectangular con difusor opal encendido sobre pared de hormigón',
    },
    {
      title: 'Tortugas y plafones',
      text: 'City, Star, Farfón y Niza. Alta resistencia al impacto.',
      href: `${ML}-tortuga`, image: 'assets/img/plafon.webp', layout: 't-tortugas',
      alt: 'Plafón redondo encendido sobre una columna de hormigón',
    },
  ];
}
