import { expect, test } from '@playwright/test';
import { DISTRIBUTORS, ZONES } from '../src/app/data/distributors';
import { SITE } from '../src/app/data/site';

const isMobile = (name: string) => name === 'mobile';

test.describe('Carga de la página', () => {
  test('no hay errores de consola ni recursos propios rotos', async ({ page, baseURL }) => {
    const errors: string[] = [];
    const broken: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('response', (r) => r.url().startsWith(baseURL!) && r.status() >= 400 && broken.push(`${r.status()} ${r.url()}`));

    await page.goto('');
    await expect(page.locator('app-root h1')).toBeVisible();
    // Recorre la página para disparar las imágenes con loading="lazy"
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await page.waitForLoadState('networkidle');

    expect(broken).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('todas las imágenes se cargan', async ({ page }) => {
    await page.goto('');
    const imgs = page.locator('img');
    const n = await imgs.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const img = imgs.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
        { message: await img.getAttribute('src') ?? '' }).toBe(true);
    }
  });

  test('título, idioma y secciones principales', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/Fuinyter/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    for (const id of ['nosotros', 'catalogo', 'distribuidores', 'contacto']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('no hay scroll horizontal', async ({ page }) => {
    await page.goto('');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('los íconos SVG reutilizables se renderizan', async ({ page }) => {
    await page.goto('');
    const box = await page.locator('.brand svg').boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    for (const id of ['mark', 'arrow', 'wa', 'ig']) {
      await expect(page.locator(`symbol#${id}`)).toHaveCount(1);
    }
  });
});

test.describe('Navegación', () => {
  test('los enlaces del menú llevan a cada sección sin salir de la página', async ({ page }, info) => {
    await page.goto('');
    const start = new URL(page.url());
    for (const id of ['catalogo', 'distribuidores', 'contacto', 'nosotros']) {
      if (isMobile(info.project.name)) await page.getByRole('button', { name: 'Abrir menú' }).click();
      await page.locator(`nav a[href="#${id}"]`).click();
      await expect(page).toHaveURL(`${start.origin}${start.pathname}#${id}`);
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('el menú marca la sección visible', async ({ page }) => {
    await page.goto('');
    await page.locator('#distribuidores h2').scrollIntoViewIfNeeded();
    await page.locator('#distribuidores').evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await expect(page.locator('nav a[href="#distribuidores"]')).toHaveAttribute('aria-current', 'true');
  });

  test('el logo vuelve arriba sin salir de la página', async ({ page }) => {
    await page.goto('#contacto');
    const path = new URL(page.url()).pathname;
    await page.locator('a.brand').click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
    expect(new URL(page.url()).pathname).toBe(path);
  });

  test('menú móvil abre y cierra', async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), 'solo en móvil');
    await page.goto('');
    const toggle = page.locator('.menu-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('nav a[href="#catalogo"]')).toBeVisible();
    await page.locator('nav a[href="#catalogo"]').click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('nav a[href="#catalogo"]')).toBeHidden();
  });

  test('en escritorio el menú se ve sin botón', async ({ page }, info) => {
    test.skip(isMobile(info.project.name), 'solo en escritorio');
    await page.goto('');
    await expect(page.locator('.menu-toggle')).toBeHidden();
    await expect(page.locator('nav a')).toHaveCount(4);
    for (const a of await page.locator('nav a').all()) await expect(a).toBeVisible();
  });
});

test.describe('Modo día / noche', () => {
  test('la lámpara cambia el tema y se recuerda al recargar', async ({ page }) => {
    await page.goto('');
    const html = page.locator('html');
    const lamp = page.locator('button.pendant');
    await expect(html).toHaveAttribute('data-theme', 'day');
    const dayBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await lamp.click();
    await expect(html).toHaveAttribute('data-theme', 'night');
    await expect(lamp).toHaveAttribute('aria-pressed', 'true');
    await expect(lamp).toHaveAccessibleName('Volver al modo día');
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).not.toBe(dayBg);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'night');
    await expect(page.locator('button.pendant')).toHaveAttribute('aria-pressed', 'true');

    await page.locator('button.pendant').click();
    await expect(html).toHaveAttribute('data-theme', 'day');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'day');
  });

  test('funciona aunque localStorage esté bloqueado', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('bloqueado'); } });
    });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('');
    await page.locator('button.pendant').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    expect(errors).toEqual([]);
  });
});

test.describe('Distribuidores', () => {
  test('cada zona muestra su cantidad y filtra la lista', async ({ page }) => {
    await page.goto('#distribuidores');
    const list = page.locator('.dealer-list .dealer');
    for (const zone of ZONES) {
      const expected = zone.id === 'all' ? DISTRIBUTORS : DISTRIBUTORS.filter((d) => d.zone === zone.id);
      const tab = page.locator(`[role=tab][data-zone="${zone.id}"]`);
      await expect(tab.locator('.count')).toHaveText(String(expected.length));
      await tab.click();
      await expect(tab).toHaveAttribute('aria-selected', 'true');
      await expect(list).toHaveCount(expected.length);
      await expect(list.locator('h3')).toHaveText(expected.map((d) => d.name));
    }
  });

  test('las flechas del teclado recorren las zonas', async ({ page }) => {
    await page.goto('#distribuidores');
    await page.locator('[role=tab][data-zone="all"]').focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator(`[role=tab][data-zone="${ZONES[1].id}"]`)).toBeFocused();
    await expect(page.locator(`[role=tab][data-zone="${ZONES[1].id}"]`)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    const last = ZONES[ZONES.length - 1];
    await expect(page.locator(`[role=tab][data-zone="${last.id}"]`)).toBeFocused();
    await expect(page.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
  });

  test('cada distribuidor tiene WhatsApp o teléfono válido, web y email', async ({ page }) => {
    await page.goto('#distribuidores');
    const cards = page.locator('.dealer-list .dealer');
    await expect(cards).toHaveCount(DISTRIBUTORS.length);
    for (const [i, d] of DISTRIBUTORS.entries()) {
      const card = cards.nth(i);
      const action = card.locator('.btn-wa');
      const href = await action.getAttribute('href');
      if (d.whatsapp) expect(href).toBe(`https://wa.me/${d.whatsapp}`);
      else expect(href, `${d.name} sin WhatsApp ni teléfono`).toMatch(/^tel:\+54\d{8,}$/);
      await expect(card.getByRole('link', { name: 'Sitio web' })).toHaveAttribute('href', `https://${d.web}`);
      await expect(card.getByRole('link', { name: 'Email' })).toHaveAttribute('href', `mailto:${d.email}`);
    }
  });
});

test.describe('Catálogo y contacto', () => {
  test('marquee muestra el horario y las líneas', async ({ page }) => {
    await page.goto('');
    const strip = page.locator('.lines-strip');
    await expect(strip).toHaveAttribute('aria-label', new RegExp(SITE.hours));
    await expect(strip.locator('.hours').first()).toHaveText(SITE.hours);
  });

  test('las familias del catálogo apuntan a Mercado Libre', async ({ page }) => {
    await page.goto('#catalogo');
    const tiles = page.locator('.catalog-grid a.tile');
    await expect(tiles).toHaveCount(4);
    for (const t of await tiles.all()) {
      await expect(t).toHaveAttribute('href', /^https:\/\/listado\.mercadolibre\.com\.ar\/iluminacion-fuinyter-/);
    }
    await expect(page.locator('.ml-cta')).toHaveAttribute('href', SITE.mercadoLibre.profile);
  });

  test('el catálogo en PDF existe', async ({ page, request }) => {
    await page.goto('#catalogo');
    const href = await page.locator('a[download]').getAttribute('href');
    const res = await request.get(new URL(href!, page.url()).href);
    expect(res.status(), `falta ${href}`).toBe(200);
  });

  test('el pie tiene email, teléfonos y redes correctos', async ({ page }) => {
    await page.goto('#contacto');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: SITE.email })).toHaveAttribute('href', `mailto:${SITE.email}`);
    for (const phone of SITE.phones) {
      await expect(footer.getByRole('link', { name: phone })).toHaveAttribute('href', /^tel:\+5411\d{8}$/);
    }
    await expect(footer.getByLabel('WhatsApp')).toHaveAttribute('href', `https://wa.me/${SITE.whatsapp}`);
    await expect(footer).toContainText(`© ${new Date().getFullYear()}`);
  });

  test('todos los enlaces externos abren en otra pestaña con noopener', async ({ page }) => {
    await page.goto('');
    const links = page.locator('a[href^="http"]');
    expect(await links.count()).toBeGreaterThan(10);
    for (const a of await links.all()) {
      await expect(a).toHaveAttribute('target', '_blank');
      await expect(a).toHaveAttribute('rel', /noopener/);
    }
  });

  test('ningún enlace queda vacío', async ({ page }) => {
    await page.goto('');
    const bad = await page.$$eval('a', (as) => as.filter((a) => {
      const h = a.getAttribute('href');
      return !h || h === '#' || h === 'tel:' || h.includes('undefined');
    }).map((a) => a.outerHTML));
    expect(bad).toEqual([]);
  });
});
