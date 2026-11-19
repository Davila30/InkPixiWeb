import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ArtworkDetail } from './artwork-detail';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

describe('ArtworkDetail', () => {
  let component: ArtworkDetail;
  let fixture: ComponentFixture<ArtworkDetail>;
  let router: Router;
  let location: Location;

  const mockArtwork: Artwork = {
    id: 1,
    title: 'Sol y nube',
    description: 'Estudio de iluminación y atmósfera matutina en acuarela digital.',
    imageUrl: null,
    author: 'Dani Ávila',
    category: 'Escenarios',
    price: 35,
    likes: 248,
  };

  const paramMap$ = new BehaviorSubject(convertToParamMap({ id: '1' }));

  const mockArtworkService = {
    getById: vi.fn((id: number) => of(id === 1 ? mockArtwork : undefined)),
    deleteArtwork: vi.fn(() => of(true)),
  };

  beforeEach(async () => {
    mockArtworkService.getById.mockClear();
    mockArtworkService.deleteArtwork.mockClear();
    paramMap$.next(convertToParamMap({ id: '1' }));

    await TestBed.configureTestingModule({
      imports: [ArtworkDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap$.asObservable(),
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
        { provide: ArtworkService, useValue: mockArtworkService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ArtworkDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and render artwork details correctly', () => {
    expect(mockArtworkService.getById).toHaveBeenCalledWith(1);
    expect(component.artwork()).toEqual(mockArtwork);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sol y nube');
    expect(compiled.textContent).toContain('Dani Ávila');
    expect(compiled.textContent).toContain('Escenarios');
    expect(compiled.textContent).toContain('35 €');
    expect(compiled.textContent).toContain('248 Me gusta');
    expect(compiled.textContent).toContain('Estudio de iluminación y atmósfera');
  });

  it('should navigate back using location or fallback', () => {
    const backSpy = vi.spyOn(location, 'back');
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.goBack();

    expect(backSpy.mock.calls.length > 0 || navigateSpy.mock.calls.length > 0).toBe(true);
    if (navigateSpy.mock.calls.length > 0) {
      expect(navigateSpy).toHaveBeenCalledWith(['/descubrir']);
    }
  });

  it('should handle open and close of the delete modal', () => {
    expect(component.isDeleteDialogOpen()).toBe(false);

    component.openDeleteModal();
    expect(component.isDeleteDialogOpen()).toBe(true);

    component.closeDeleteModal();
    expect(component.isDeleteDialogOpen()).toBe(false);
  });

  it('should delete artwork and navigate to /descubrir on confirmDelete', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.confirmDelete();

    expect(mockArtworkService.deleteArtwork).toHaveBeenCalledWith(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/descubrir']);
  });

  it('should show not-found message when artwork is undefined', async () => {
    paramMap$.next(convertToParamMap({ id: '999' }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.notFound()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Obra no encontrada');
  });
});
