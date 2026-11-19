import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { Home } from './home';
import { Artwork } from '../../shared/models/artwork';
import { ArtworkService } from '../../shared/services/artwork.service';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let router: Router;

  const mockArtworks: Artwork[] = [
    { id: 1, title: 'Sol y nube', description: 'Desc 1', imageUrl: null, author: 'Dani Ávila', category: 'Escenarios', price: null, likes: 248 },
    { id: 2, title: 'Gold Token Riftbound', description: 'Desc 2', imageUrl: null, author: 'Dani Ávila', category: 'Personajes', price: 35, likes: 3578 },
    { id: 3, title: 'Blood Dancer', description: 'Desc 3', imageUrl: null, author: 'Dani Ávila', category: 'Criaturas', price: null, likes: 2334 },
    { id: 4, title: 'Ojos de luna', description: 'Desc 4', imageUrl: null, author: 'Lucía Moreno', category: 'Personajes', price: null, likes: 912 },
    { id: 5, title: 'Tormenta en el mar', description: 'Desc 5', imageUrl: null, author: 'Pablo Sánchez', category: 'Escenarios', price: 60, likes: 1540 },
  ];

  const mockArtworkService = {
    getPage: () => of({ items: mockArtworks, hasMore: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        { provide: ArtworkService, useValue: mockArtworkService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display featured artworks without infinite scroll in home', () => {
    expect(component.featuredArtworks().length).toBe(4);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Obras destacadas');
    expect(element.textContent).toContain('Ver todas en Descubrir ↗');
  });

  it('should navigate to /descubrir on goToDiscover', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.searchQuery.set('dragón');
    component.goToDiscover();

    expect(navigateSpy).toHaveBeenCalledWith(['/descubrir'], { queryParams: { q: 'dragón' } });
  });
});
