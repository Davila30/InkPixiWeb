import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Discover } from './discover';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

describe('Discover', () => {
  let component: Discover;
  let fixture: ComponentFixture<Discover>;

  const mockArtworks: Artwork[] = [
    { id: 1, title: 'Sol y nube', imageUrl: null, author: 'Dani Ávila', category: 'Escenarios', price: null, likes: 248 },
    { id: 2, title: 'Gold Token Riftbound', imageUrl: null, author: 'Dani Ávila', category: 'Personajes', price: 35, likes: 3578 },
    { id: 3, title: 'Blood Dancer', imageUrl: null, author: 'Dani Ávila', category: 'Criaturas', price: null, likes: 2334 },
  ];

  const mockArtworkService = {
    getPage: () => of({ items: mockArtworks, hasMore: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discover],
      providers: [
        provideRouter([]),
        { provide: ArtworkService, useValue: mockArtworkService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Discover);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial artworks and display them', () => {
    expect(component.filteredArtworks().length).toBe(3);
  });

  it('should filter by query and category', () => {
    component.searchQuery.set('Gold');
    expect(component.filteredArtworks().length).toBe(1);

    component.searchQuery.set('');
    component.selectCategory('Criaturas');
    expect(component.filteredArtworks().length).toBe(1);
    expect(component.filteredArtworks()[0].title).toBe('Blood Dancer');
  });
});
