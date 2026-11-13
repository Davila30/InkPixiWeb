import { Component, computed, input, signal } from '@angular/core';
import { Artwork } from '../../models/artwork';

@Component({
  imports: [],
  selector: 'app-art-card',
  styleUrl: './art-card.css',
  templateUrl: './art-card.html',
})
export class ArtCard {
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