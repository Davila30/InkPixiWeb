import { Component, Input } from '@angular/core';

export interface Artwork {
  title: string;
  author: string;
  categories: string[];
  likes: number;
  price: string;
  portfolioUrl: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-art-card',
  styleUrl: './art-card.css',
  templateUrl: './art-card.html',
})
export class ArtCard {
  @Input() artwork: Artwork = {
    title: 'Obra sin título',
    author: 'Artista',
    categories: [],
    likes: 0,
    price: 'Consultar precio',
    portfolioUrl: '#',
  };

  saved = false;
}
