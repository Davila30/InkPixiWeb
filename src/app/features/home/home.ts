import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArtCard } from '../../shared/components/art-card/art-card';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

const SHOW_MESSAGES_BUTTON_FROM = 300;

@Component({
  imports: [ArtCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
  host: { '(window:scroll)': 'onScroll()' },
})
export class Home {
  private readonly artworkService = inject(ArtworkService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly artworks = signal<Artwork[]>([]);
  protected readonly loading = signal(false);
  protected readonly hasMore = signal(true);
  protected readonly showMessagesButton = signal(false);

  private page = 0;
  private observer?: IntersectionObserver;
  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');
  private readonly searchSection = viewChild<ElementRef<HTMLElement>>('searchSection');

  constructor() {
     afterNextRender(() => {
      const el = this.sentinel()?.nativeElement;
      if (!el) return;

      if (typeof IntersectionObserver === 'undefined') {
        this.loadMore(); 
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) this.loadMore();
        },
        { rootMargin: '300px 0px' },
      );
      this.observer.observe(el);
      this.destroyRef.onDestroy(() => this.observer?.disconnect());
    });
  }

  protected onScroll(): void {
    this.showMessagesButton.set(window.scrollY > SHOW_MESSAGES_BUTTON_FROM);
  }

  protected scrollToGallery(): void {
    this.searchSection()?.nativeElement.scrollIntoView({ block: 'start' });
  }

  private loadMore(): void {
    if (this.loading() || !this.hasMore()) return;
    this.loading.set(true);

    this.artworkService
      .getPage(this.page)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.artworks.update((list) => [...list, ...res.items]);
        this.hasMore.set(res.hasMore);
        this.page++;
        this.loading.set(false);

        const el = this.sentinel()?.nativeElement;
        if (el && res.hasMore) {
          this.observer?.unobserve(el);
          this.observer?.observe(el);
        }
      });
  }
}