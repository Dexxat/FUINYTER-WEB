export interface Zone {
  id: string;
  label: string;
}

export interface Distributor {
  zone: string;
  name: string;
  city: string;
  /** Líneas de dirección (una por sucursal o local) */
  lines: string[];
  phones: string[];
  whatsapp?: string;
  hours?: string;
  email: string;
  web: string;
}

export const ZONES: Zone[] = [
  { id: 'all', label: 'Todas las zonas' },
  { id: 'caba', label: 'Ciudad de Buenos Aires' },
  { id: 'gba', label: 'Gran Buenos Aires y La Plata' },
  { id: 'pba', label: 'Interior de Buenos Aires' },
  { id: 'cordoba', label: 'Córdoba' },
  { id: 'chaco', label: 'Chaco' },
  { id: 'sanjuan', label: 'San Juan' },
];

/** Fuente: iluminacion.net, comercios que representan Fuinyter (oct. 2026). */
export const DISTRIBUTORS: Distributor[] = [
  {
    zone: 'caba', name: 'Luminocity', city: 'Villa Crespo, CABA',
    lines: ['Av. Warnes 986, esquina J. B. Justo', 'Tel. (011) 5263-5555'],
    phones: ['(011) 5263-5555'], whatsapp: '5491124070718',
    hours: 'Lun a vie 9 a 14 y 15 a 18 h · Sáb 10 a 13:30 h',
    email: 'ventas@luminocity.com.ar', web: 'luminocity.com.ar',
  },
  {
    zone: 'caba', name: 'Elecsa Iluminación', city: 'Monserrat, CABA',
    lines: ['Iluminación: México 1749', 'Electricidad: México 1757', 'Tel. (011) 4383-5468 / 4383-5668 / 4383-7925'],
    phones: ['(011) 4383-5468'],
    hours: 'Lun a vie 9 a 19:30 h · Sáb 9 a 13 h',
    email: 'iluminacion@elecsaelectricidad.com.ar', web: 'elecsailuminacion.com.ar',
  },
  {
    zone: 'gba', name: 'Castex', city: 'Canning, Ezeiza',
    lines: ['Av. Mariano Castex 1318'],
    phones: [], whatsapp: '5491171455420',
    hours: 'Lun a vie 8 a 13 y 14 a 18 h · Sáb 8 a 13 h',
    email: 'iluminacion@castexgroup.com.ar', web: 'castexgroup.com.ar',
  },
  {
    zone: 'gba', name: 'Electro Once', city: 'La Plata',
    lines: ['Calle 11 N° 460, entre 41 y 42', 'Tel. (0221) 421-1675 / 425-7001'],
    phones: ['(0221) 421-1675'], whatsapp: '5492216806611',
    hours: 'Lun a vie 8 a 16 h · Sáb 8:30 a 13 h',
    email: 'ventas@electro11.com.ar', web: 'electroonce.com',
  },
  {
    zone: 'gba', name: 'Lograsso', city: 'La Plata',
    lines: ['Av. 44 N° 2270, entre 140 y 141', 'Tel. (0221) 470-6527'],
    phones: ['(0221) 470-6527'], whatsapp: '5492216018766',
    hours: 'Lun a vie 8 a 16 h · Sáb 8 a 13 h',
    email: 'ventasweb@lograssoiluminacion.com.ar', web: 'lograssoiluminacion.com.ar',
  },
  {
    zone: 'pba', name: 'Casa Braghi', city: 'Suipacha y San Andrés de Giles',
    lines: ['Casa central: 25 de Mayo 430, Suipacha', 'Tel. (02324) 480963', 'Sucursal: 25 de Mayo 925, San Andrés de Giles', 'Tel. (02325) 442285'],
    phones: ['(02324) 480963'],
    hours: 'Lun a vie 9 a 12 y 14 a 19 h · Sáb 14 a 19 h',
    email: 'iluminacion@casabraghi.com.ar', web: 'casabraghi.com.ar',
  },
  {
    zone: 'pba', name: 'Celsius Comercial', city: 'Bahía Blanca',
    lines: ['Comercial: Brown 935', 'Tel. (0291) 453-8906 / 454-3754', 'Iluminación: Ing. Luiggi 45', 'Tel. (0291) 452-1542'],
    phones: ['(0291) 453-8906'],
    email: 'info@celsiuscomercial.com', web: 'celsiuscomercial.com/materiales_electricos',
  },
  {
    zone: 'pba', name: 'Marini & Cía.', city: 'Bahía Blanca',
    lines: ['Zelarrayán 933', 'Tel. (0291) 456-1076 / 451-4193'],
    phones: ['(0291) 456-1076'], whatsapp: '5492914632403',
    email: 'info@marinicia.com', web: 'mariniycia.com.ar',
  },
  {
    zone: 'cordoba', name: 'Fema', city: 'Villa María, Córdoba',
    lines: ['Jujuy 544', 'Tel. (0353) 453-4121'],
    phones: ['(0353) 453-4121'], whatsapp: '5493536560777',
    email: 'web.femaelectricidad@gmail.com', web: 'femaelectricidad.com.ar',
  },
  {
    zone: 'chaco', name: 'Casa Aides', city: 'Resistencia, Chaco',
    lines: ['Peatonal Juan Domingo Perón 120', 'Tel. (0362) 443-1253 / 442-9888 / 442-4468'],
    phones: ['(0362) 443-1253'], whatsapp: '5493624080808',
    email: 'iluminacion@casaaides.com.ar', web: 'casaaides.com.ar',
  },
  {
    zone: 'sanjuan', name: 'Car Mar Electricidad', city: 'San Juan',
    lines: ['Av. España Sur 576', 'Tel. (0264) 421-4811 / 427-0717 / 427-3400'],
    phones: ['(0264) 421-4811'],
    email: 'camartin@uolsinectis.com.ar', web: 'carmarelectricidad.com.ar',
  },
];
