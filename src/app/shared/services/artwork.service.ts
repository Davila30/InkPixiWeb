import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Artwork } from '../models/artwork';

export interface ArtworkPage {
  items: Artwork[];
  hasMore: boolean;
}

const TOTAL = 48;

const SAMPLES: Omit<Artwork, 'id'>[] = [
  {
    title: 'Sol y nube',
    description:
      'Estudio de iluminación y atmósfera matutina en acuarela digital. Representa el despertar tranquilo de un valle cubierto de bruma donde los rayos solares atraviesan formaciones nubosas ligeras, generando contrastes suaves entre tonos dorados y violetas.',
    imageUrl: null,
    author: 'Dani Ávila',
    category: 'Escenarios',
    price: null,
    likes: 248,
  },
  {
    title: 'Gold Token Riftbound',
    description:
      'Ficha coleccionable e ilustración para juego de cartas táctico de fantasía. El diseño combina orfebrería arcana, runas talladas a mano y un acabado metálico dorado reflectante con detalles desgastados por la batalla.',
    imageUrl: null,
    author: 'Dani Ávila',
    category: 'Personajes',
    price: 35,
    likes: 3578,
  },
  {
    title: 'Blood Dancer',
    description:
      'Concept art de personaje guerrero inspirado en la danza carmesí del desierto oriental.\n\nEsta pieza profundiza en el movimiento cinético y las telas fluidas teñidas en tonos escarlata y granate profundo. El personaje empuña dos cimitarras curvadas que reflejan la luz crepuscular en pleno giro marcial.\n\nEl desarrollo tomó más de 40 horas de trabajo digital mediante técnicas combinadas de pintura por capas y simulación de texturas tradicionales. Se prestó especial atención a las sombras arrojadas, la textura de la seda rasgada y los detalles del ornamento en plata ennegrecida.\n\nUna exploración visual intensa sobre el equilibrio entre la letalidad marcial y la elegancia coreográfica.',
    imageUrl: null,
    author: 'Dani Ávila',
    category: 'Criaturas',
    price: null,
    likes: 2334,
  },
  {
    title: 'Ojos de luna',
    description:
      'Retrato de fantasía con paleta fría en tonos azules medianoche y plata. La mirada del personaje refleja las fases lunares en un rostro envuelto por velos estelares y constelaciones brillantes.',
    imageUrl: null,
    author: 'Lucía Moreno',
    category: 'Personajes',
    price: null,
    likes: 912,
  },
  {
    title: 'Tormenta en el mar',
    description:
      'Pintura digital de oleaje embravecido contra acantilados oscuros. La composición busca transmitir la fuerza imparable de la naturaleza marina mediante pinceladas enérgicas y contrastes lumínicos bajo un cielo cargado de relámpagos.',
    imageUrl: null,
    author: 'Pablo Sánchez',
    category: 'Escenarios',
    price: 60,
    likes: 1540,
  },
  {
    title: 'Guardianes del laboratorio',
    description:
      'Criaturas biomédicas sintéticas que patrullan un laboratorio subterráneo abandonado. Mezcla de anatomía biomecánica, bioluminiscencia verdosa y superficies de cristal translúcido.',
    imageUrl: null,
    author: 'Marta Iglesias',
    category: 'Criaturas',
    price: null,
    likes: 377,
  },
  {
    title: 'Cañón dorado',
    description:
      'Vista panorámica de un cañón desértico al atardecer, esculpido por siglos de erosión eólica. Tonos terracota, dorados y sombras violetas que destacan la escala monumental de la garganta rocosa.',
    imageUrl: null,
    author: 'Elena Torres',
    category: 'Escenarios',
    price: null,
    likes: 865,
  },
  {
    title: 'Dragón de ceniza',
    description:
      'Diseño de criatura colosal que habita en las faldas de un volcán durmiente. Sus escamas están formadas por basalto y obsidianas que emiten ascuas ardientes al desplegar sus alas de humo denso.',
    imageUrl: null,
    author: 'Hugo Vega',
    category: 'Criaturas',
    price: 120,
    likes: 4120,
  },
];

@Injectable({ providedIn: 'root' })
export class ArtworkService {
  private artworks: Artwork[] = Array.from({ length: TOTAL }, (_, n) => {
    const sample = SAMPLES[n % SAMPLES.length];
    return {
      ...sample,
      id: n + 1,
      likes: sample.likes + n,
    };
  });

  getPage(page: number, size = 8): Observable<ArtworkPage> {
    const start = page * size;
    const end = Math.min(start + size, this.artworks.length);
    const items = this.artworks.slice(start, end).map((item) => ({ ...item }));
    const hasMore = end < this.artworks.length;
    return of({ items, hasMore }).pipe(delay(300));
  }

  getById(id: number): Observable<Artwork | undefined> {
    const artwork = this.artworks.find((item) => item.id === id);
    return of(artwork ? { ...artwork } : undefined).pipe(delay(150));
  }

  deleteArtwork(id: number): Observable<boolean> {
    const prevCount = this.artworks.length;
    this.artworks = this.artworks.filter((item) => item.id !== id);
    const deleted = this.artworks.length < prevCount;
    return of(deleted).pipe(delay(150));
  }
}