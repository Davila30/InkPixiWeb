import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ArtCard } from '../../shared/components/art-card/art-card';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

const SHOW_MESSAGES_BUTTON_FROM = 300;

@Component({
  selector: 'app-home',
  imports: [Navbar, ArtCard, RouterLink, Footer],
  styleUrl: './home.css',
  templateUrl: './home.html',
  host: { '(window:scroll)': 'onScroll()' },
})
export class Home {
  private readonly artworkService = inject(ArtworkService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  protected readonly artworks = signal<Artwork[]>([]);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<string>('Todas');
  protected readonly showMessagesButton = signal(false);

  // Muestra una selección destacada en Home sin saturar con scroll infinito
  readonly featuredArtworks = computed(() => this.artworks().slice(0, 4));

  constructor() {
    this.artworkService
      .getPage(0, 12)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.artworks.set(res.items);
      });
  }

  protected onScroll(): void {
    if (typeof window !== 'undefined') {
      this.showMessagesButton.set(window.scrollY > SHOW_MESSAGES_BUTTON_FROM);
    }
  }

  goToDiscover(event?: Event): void {
    if (event) event.preventDefault();
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/descubrir'], { queryParams: { q: query } });
    } else {
      this.router.navigate(['/descubrir']);
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
