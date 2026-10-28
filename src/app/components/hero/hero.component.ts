import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private readonly themeService = inject(ThemeService);
  readonly night = computed(() => this.themeService.theme() === 'night');

  toggleTheme(): void { this.themeService.toggle(); }
}
