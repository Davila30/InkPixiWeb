import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Artwork } from '../models/artwork';

export interface ArtworkPage {
  items: Artwork[];
  hasMore: boolean;
}

const TOTAL = 48;

const SAMPLES: Omit<Artwork, 'id'>[] = [
  { title: 'Sol y nube', imageUrl: null, author: 'Dani Ávila', category: 'Escenarios', price: null, likes: 248 },
  { title: 'Gold Token Riftbound', imageUrl: null, author: 'Dani Ávila', category: 'Personajes', price: 35, likes: 3578 },
  { title: 'Blood Dancer', imageUrl: null, author: 'Dani Ávila', category: 'Criaturas', price: null, likes: 2334 },
  { title: 'Ojos de luna', imageUrl: null, author: 'Lucía Moreno', category: 'Personajes', price: null, likes: 912 },
  { title: 'Tormenta en el mar', imageUrl: null, author: 'Pablo Sánchez', category: 'Escenarios', price: 60, likes: 1540 },
  { title: 'Guardianes del laboratorio', imageUrl: null, author: 'Marta Iglesias', category: 'Criaturas', price: null, likes: 377 },
  { title: 'Cañón dorado', imageUrl: null, author: 'Elena Torres', category: 'Escenarios', price: null, likes: 865 },
  { title: 'Dragón de ceniza', imageUrl: null, author: 'Hugo Vega', category: 'Criaturas', price: 120, likes: 4120 },
];

@Injectable({ providedIn: 'root' })
export class ArtworkService {

  getPage(page: number, size = 8): Observable<ArtworkPage> {
    const start = page * size;
    const end = Math.min(start + size, TOTAL);
    const items: Artwork[] = [];
    for (let n = start; n < end; n++) {
      const sample = SAMPLES[n % SAMPLES.length];
      items.push({ ...sample, id: n + 1, likes: sample.likes + n });
    }
    return of({ items, hasMore: end < TOTAL }).pipe(delay(600)); // simula la latencia de red
  }
}