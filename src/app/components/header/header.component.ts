import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { SITE, waLink } from '../../data/site';

interface NavLink { id: string; label: string; }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: { '[class.menu-open]': 'menuOpen()' },
})
export class HeaderComponent {
  readonly links: NavLink[] = [
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'distribuidores', label: 'Distribuidores' },
    { id: 'contacto', label: 'Contactanos' },
  ];
  readonly instagram = SITE.instagram;
  readonly whatsapp = waLink();

  readonly menuOpen = signal(false);
  readonly active = signal('nosotros');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Marca en el menú la sección que se está viendo
    afterNextRender(() => {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && this.active.set(e.target.id)),
        { rootMargin: '-45% 0px -50% 0px' },
      );
      this.links.forEach((l) => {
        const el = document.getElementById(l.id);
        if (el) io.observe(el);
      });
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  toggleMenu(): void { this.menuOpen.update((v) => !v); }
  closeMenu(): void { this.menuOpen.set(false); }
}
