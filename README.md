# Fuinyter Iluminación — sitio web

Landing page de Fuinyter, hecha en **Angular 19** con componentes independientes (standalone) y Signals.
El catálogo completo vive en Mercado Libre; la página presenta la marca, las familias de producto,
los distribuidores y el contacto.

## Requisitos

- Node.js 20 o superior (recomendado 22)
- npm

## Uso local

```bash
npm install      # instala dependencias (solo la primera vez)
npm start        # servidor de desarrollo en http://localhost:4200
npm run build    # compila la versión de producción en dist/fuinyter-web/browser
```

## Estructura

```
src/
├── index.html                 # Fuentes, favicon e íconos SVG reutilizables
├── styles.css                 # Tokens de diseño (colores día/noche), base y botones
└── app/
    ├── app.component.ts       # Arma la página con las secciones
    ├── core/theme.service.ts  # Modo día / noche (lo activa la lámpara del hero)
    ├── data/
    │   ├── site.ts            # Teléfonos, WhatsApp, Instagram, Mercado Libre, PDF
    │   └── distributors.ts    # Zonas y distribuidores
    └── components/
        ├── header/            # Logo, menú, redes y menú móvil
        ├── hero/              # Círculo del logo, lámpara colgante y Nosotros
        ├── marquee/           # Franja animada con líneas y horario
        ├── catalog/           # Bloque de Mercado Libre, familias y PDF
        ├── distributors/      # Selector por zona y farol decorativo
        └── footer/            # Contacto y marca
public/
├── assets/img/                # Fotos de producto, lámparas y logo de Mercado Libre
├── favicon.svg
└── CNAME                      # Dominio (referencia; GitHub Pages lo toma de Settings)
```

### Tareas habituales

- **Cambiar un teléfono, el WhatsApp o un link:** `src/app/data/site.ts`
- **Agregar o editar un distribuidor:** `src/app/data/distributors.ts`
- **Subir el catálogo en PDF:** guardarlo como `public/assets/catalogo-fuinyter.pdf`
- **Cambiar colores:** variables al principio de `src/styles.css` (el bloque `html[data-theme="night"]` es el modo noche)

## Publicación en GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`: cada `git push` a la rama `main` compila
el sitio y lo publica automáticamente.

1. Crear el repositorio en GitHub y subir el proyecto (ver abajo).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Hacer un push a `main` y esperar a que termine la acción (pestaña **Actions**).

### Dominio propio (fuinyter.com.ar)

1. (Recomendado) Verificar el dominio en **Settings de tu cuenta → Pages → Add a domain** y crear el
   registro TXT que GitHub indique.
2. En el repositorio: **Settings → Pages → Custom domain** → escribir `fuinyter.com.ar` → **Save**.
3. Recién después, en el panel DNS del dominio:
   - Cuatro registros **A** para `fuinyter.com.ar` (`@`):
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (Opcional) Cuatro registros **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Un registro **CNAME** para `www` → `USUARIO.github.io` (sin el nombre del repositorio)
4. **No tocar los registros MX** (el correo `iluminacion@fuinyter.com.ar` depende de ellos).
5. Cuando GitHub marque el dominio como verificado, activar **Enforce HTTPS**
   (puede tardar hasta 24 h en aparecer).

## Primer push

```bash
git remote add origin https://github.com/USUARIO/fuinyter-web.git
git push -u origin main
```
