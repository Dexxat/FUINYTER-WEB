import { Component, computed, signal } from '@angular/core';
import { DISTRIBUTORS, Distributor, ZONES } from '../../data/distributors';
import { telLink, waLink } from '../../data/site';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrl: './distributors.component.css',
})
export class DistributorsComponent {
  readonly zones = ZONES;
  readonly selected = signal('all');

  readonly visible = computed(() => {
    const zone = this.selected();
    return zone === 'all' ? DISTRIBUTORS : DISTRIBUTORS.filter((d) => d.zone === zone);
  });
  readonly selectedLabel = computed(() => ZONES.find((z) => z.id === this.selected())?.label ?? '');

  readonly joinLink = waLink('Hola, quiero ser distribuidor de Fuinyter');
  readonly helpLink = waLink();

  count(zoneId: string): number {
    return zoneId === 'all' ? DISTRIBUTORS.length : DISTRIBUTORS.filter((d) => d.zone === zoneId).length;
  }

  select(zoneId: string, el?: HTMLElement): void {
    this.selected.set(zoneId);
    el?.focus();
  }

  /** Flechas del teclado para recorrer las zonas (patrón de pestañas accesibles) */
  onKey(event: KeyboardEvent, buttons: HTMLElement): void {
    const steps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const i = ZONES.findIndex((z) => z.id === this.selected());
    const next = ZONES[(i + step + ZONES.length) % ZONES.length];
    this.selected.set(next.id);
    (buttons.querySelector(`[data-zone="${next.id}"]`) as HTMLElement | null)?.focus();
  }

  wa(d: Distributor): string { return waLink(undefined, d.whatsapp); }
  tel(d: Distributor): string { return d.phones[0] ? telLink(d.phones[0]) : ''; }
}
