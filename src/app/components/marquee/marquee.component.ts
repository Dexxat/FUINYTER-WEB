import { Component, computed, input } from '@angular/core';
import { SITE } from '../../data/site';

/** Franja animada con las líneas de producto y el horario de atención. */
@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.css',
})
export class MarqueeComponent {
  readonly lines = input<string[]>(['Venezia', 'Siena', 'Bari', 'Colonial', 'City', 'Star', 'Niza', 'Trini', 'Sigma', 'Globit']);
  readonly hours = input<string>(SITE.hours);

  /** El horario aparece al principio y a mitad de cada vuelta. */
  readonly items = computed(() => {
    const l = this.lines();
    const half = Math.ceil(l.length / 2);
    return [
      { text: this.hours(), strong: true },
      ...l.slice(0, half).map((text) => ({ text, strong: false })),
      { text: this.hours(), strong: true },
      ...l.slice(half).map((text) => ({ text, strong: false })),
    ];
  });

  readonly label = computed(() => `${this.hours()}. Líneas: ${this.lines().join(', ')}`);
}
