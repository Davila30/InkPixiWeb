import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'app-art-card',
  imports: [RouterLink],
  styleUrl: './art-card.css',
  templateUrl: './art-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtCard {
  private readonly router = inject(Router, { optional: true });

  readonly artwork = input.required<Artwork>();
  readonly viewPortfolio = output<Artwork>();

  protected readonly saved = signal(false);
  protected readonly liked = signal(false);
  protected readonly likes = computed(() => this.artwork().likes + (this.liked() ? 1 : 0));

  protected toggleSaved(): void {
    this.saved.update((v) => !v);
  }

  protected toggleLike(): void {
    this.liked.update((v) => !v);
  }

  protected onViewPortfolio(): void {
    this.viewPortfolio.emit(this.artwork());
    this.router?.navigate(['/obra', this.artwork().id]);
  }
}
