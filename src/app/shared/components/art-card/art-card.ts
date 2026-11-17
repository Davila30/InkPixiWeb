<<<<<<< HEAD
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
=======
import { Component, computed, input, signal } from '@angular/core';
import { Artwork } from '../../models/artwork';
>>>>>>> 41ad75e84ffa89a839bdb82410a3dcc596a772ac

@Component({
  selector: 'app-art-card',
  styleUrl: './art-card.css',
  templateUrl: './art-card.html',
})
export class ArtCard {
<<<<<<< HEAD
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
=======
  readonly artwork = input.required<Artwork>();

  protected readonly saved = signal(false);
  protected readonly liked = signal(false);
  protected readonly likes = computed(() => this.artwork().likes + (this.liked() ? 1 : 0));

  protected toggleSaved(): void {
    this.saved.update((v) => !v);
  }

  protected toggleLike(): void {
    this.liked.update((v) => !v);
  }
}
>>>>>>> 41ad75e84ffa89a839bdb82410a3dcc596a772ac
