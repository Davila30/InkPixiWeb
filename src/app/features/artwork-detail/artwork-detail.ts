import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

@Component({
  selector: 'app-artwork-detail',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './artwork-detail.html',
  styleUrl: './artwork-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly artworkService = inject(ArtworkService);
  private readonly destroyRef = inject(DestroyRef);

  readonly artwork = signal<Artwork | undefined>(undefined);
  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly isDeleteDialogOpen = signal(false);

  readonly deleteDialog = viewChild<ElementRef<HTMLDialogElement>>('deleteDialog');

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : NaN;

      if (!id || isNaN(id)) {
        this.loading.set(false);
        this.notFound.set(true);
        return;
      }

      this.loading.set(true);
      this.artworkService
        .getById(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (art) => {
            this.artwork.set(art);
            this.notFound.set(!art);
            this.loading.set(false);
          },
          error: () => {
            this.notFound.set(true);
            this.loading.set(false);
          },
        });
    });
  }

  goBack(): void {
    const state = this.location.getState() as { navigationId?: number } | undefined;
    if (state && typeof state.navigationId === 'number' && state.navigationId > 1) {
      this.location.back();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/descubrir']);
    }
  }

  openDeleteModal(): void {
    this.isDeleteDialogOpen.set(true);
    const dialog = this.deleteDialog()?.nativeElement;
    if (dialog) {
      if (typeof dialog.showModal === 'function' && !dialog.open) {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }
  }

  closeDeleteModal(): void {
    this.isDeleteDialogOpen.set(false);
    const dialog = this.deleteDialog()?.nativeElement;
    if (dialog) {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }

  confirmDelete(): void {
    const art = this.artwork();
    if (!art) {
      return;
    }

    this.closeDeleteModal();
    this.artworkService
      .deleteArtwork(art.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/descubrir']);
      });
  }
}
