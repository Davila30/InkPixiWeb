import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ArtCard } from '../../shared/components/art-card/art-card';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

@Component({
  selector: 'app-discover',
  imports: [Navbar, ArtCard, Footer],
  styleUrl: './discover.css',
  templateUrl: './discover.html',
})
export class Discover {
  private readonly artworkService = inject(ArtworkService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly artworks = signal<Artwork[]>([]);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<string>('Todas');
  readonly isFilterOpen = signal(false);

  readonly categories = ['Todas', 'Escenarios', 'Personajes', 'Criaturas'] as const;

  readonly filteredArtworks = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    const list = this.artworks();

    return list.filter((art) => {
      const matchesCategory = category === 'Todas' || art.category === category;
      const matchesQuery =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  });

  constructor() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['q']) {
          this.searchQuery.set(params['q']);
        }
      });

    this.artworkService
      .getPage(0, 12)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.artworks.set(res.items);
      });
  }

  toggleFilter(): void {
    this.isFilterOpen.update((open) => !open);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.isFilterOpen.set(false);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
