import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtCard } from './art-card';
import { Artwork } from '../../models/artwork';

describe('ArtCard', () => {
  let component: ArtCard;
  let fixture: ComponentFixture<ArtCard>;

  const sampleArtwork: Artwork = {
    id: 1,
    title: 'Sol y nube',
    imageUrl: null,
    author: 'Dani Ávila',
    category: 'Escenarios',
    price: null,
    likes: 248,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtCard);
    fixture.componentRef.setInput('artwork', sampleArtwork);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show artwork details and toggle the saved state', () => {
    fixture.componentRef.setInput('artwork', {
      id: 2,
      title: 'Gold Token Riftbound',
      imageUrl: null,
      author: 'Dani Ávila',
      category: 'Personajes',
      likes: 3578,
      price: 35,
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Gold Token Riftbound');
    expect(element.textContent).toContain('Dani Ávila');
    expect(element.textContent).toContain('Personajes · Portfolio');
    expect(element.textContent).toContain('3578');
    expect(element.textContent).toContain('35€');

    const saveButton = element.querySelector('.guardar') as HTMLButtonElement;
    saveButton.click();
    fixture.detectChanges();

    expect(saveButton.getAttribute('aria-pressed')).toBe('true');
    expect(saveButton.getAttribute('aria-label')).toBe('Quitar de guardados');
  });

  it('should emit viewPortfolio when clicking "Ver portfolio ↗"', () => {
    let emitted: Artwork | undefined;
    component.viewPortfolio.subscribe((art) => (emitted = art));

    const element = fixture.nativeElement as HTMLElement;
    const portfolioButton = element.querySelector('.ver-portfolio') as HTMLButtonElement;
    portfolioButton.click();

    expect(emitted).toEqual(sampleArtwork);
  });
});
