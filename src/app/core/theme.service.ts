import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'day' | 'night';

const STORAGE_KEY = 'fuinyter-theme';

/**
 * Modo día / noche. La lámpara colgante del hero lo activa.
 * El tema se refleja como data-theme en <html>, y los colores
 * cambian a través de las variables CSS definidas en styles.css.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.readSaved());

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.doc.documentElement.dataset['theme'] = theme;
      try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* almacenamiento no disponible */ }
    });
  }

  toggle(): void {
    const root = this.doc.documentElement;
    root.classList.add('theme-anim');
    setTimeout(() => root.classList.remove('theme-anim'), 650);
    this.theme.update((t) => (t === 'night' ? 'day' : 'night'));
  }

  private readSaved(): Theme {
    try { return localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'day'; } catch { return 'day'; }
  }
}
