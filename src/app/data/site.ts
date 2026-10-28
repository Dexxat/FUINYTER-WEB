/** Datos de contacto y enlaces de la marca, en un solo lugar. */
export const SITE = {
  whatsapp: '5491127909262',
  instagram: 'https://www.instagram.com/fuinyter.ar/',
  email: 'iluminacion@fuinyter.com.ar',
  phones: ['(011) 4735-0401', '(011) 4766-9555', '(011) 4766-8138'],
  hours: 'Atención lunes a viernes, 8 a 17 h',
  mercadoLibre: {
    profile: 'https://www.mercadolibre.com.ar/perfil/ILUMINACION+FUINYTER',
    listings: 'https://listado.mercadolibre.com.ar/iluminacion-fuinyter?sb=all_mercadolibre',
    seller: 'Iluminacion Fuinyter',
  },
  /** PENDIENTE: subir el PDF a public/assets/catalogo-fuinyter.pdf */
  catalogPdf: 'assets/catalogo-fuinyter.pdf',
} as const;

export const waLink = (text?: string, number: string = SITE.whatsapp): string =>
  `https://wa.me/${number}${text ? '?text=' + encodeURIComponent(text) : ''}`;

export const telLink = (phone: string): string =>
  'tel:+54' + phone.replace(/\D/g, '').replace(/^0/, '');
