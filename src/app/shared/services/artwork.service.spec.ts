import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
  let service: ArtworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial page of artworks', async () => {
    const page = await firstValueFrom(service.getPage(0, 4));
    expect(page.items.length).toBe(4);
    expect(page.hasMore).toBe(true);
    expect(page.items[0].description).toBeTruthy();
  });

  it('should get artwork by id', async () => {
    const artwork = await firstValueFrom(service.getById(1));
    expect(artwork).toBeDefined();
    expect(artwork?.id).toBe(1);
    expect(artwork?.title).toBe('Sol y nube');
    expect(artwork?.description).toBeTruthy();
  });

  it('should return undefined for non-existent id', async () => {
    const artwork = await firstValueFrom(service.getById(9999));
    expect(artwork).toBeUndefined();
  });

  it('should delete artwork and remove it from subsequent getPage and getById calls', async () => {
    const initialPage = await firstValueFrom(service.getPage(0, 10));
    expect(initialPage.items.some((art) => art.id === 2)).toBe(true);

    const deleted = await firstValueFrom(service.deleteArtwork(2));
    expect(deleted).toBe(true);

    const afterDeleteById = await firstValueFrom(service.getById(2));
    expect(afterDeleteById).toBeUndefined();

    const afterDeletePage = await firstValueFrom(service.getPage(0, 10));
    expect(afterDeletePage.items.some((art) => art.id === 2)).toBe(false);
  });
});
