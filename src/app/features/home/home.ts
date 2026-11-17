import { Component } from '@angular/core';
import { ArtCard, Artwork } from '../../shared/components/art-card/art-card';

@Component({
  imports: [ArtCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly artworks: Artwork[] = [
    {
      title: 'Gold Token Riftbound',
      author: 'Dani Avila',
      categories: ['Personajes', 'Portfolio'],
      likes: 3578,
      price: '35€',
      portfolioUrl: '#',
    },
    {
      title: 'Sueños de otro mundo',
      author: 'María López',
      categories: ['Ilustración', 'Fantasía'],
      likes: 1240,
      price: '28€',
      portfolioUrl: '#',
    },
    {
      title: 'Jardín en calma',
      author: 'Alex Rivera',
      categories: ['Naturaleza', 'Digital'],
      likes: 986,
      price: '40€',
      portfolioUrl: '#',
    },
    {
      title: 'Retrato de verano',
      author: 'Sofía Martín',
      categories: ['Retrato', 'Personajes'],
      likes: 2156,
      price: '32€',
      portfolioUrl: '#',
    },
  ];
}
