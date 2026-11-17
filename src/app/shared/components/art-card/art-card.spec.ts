import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtCard } from './art-card';

describe('ArtCard', () => {
  let component: ArtCard;
  let fixture: ComponentFixture<ArtCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show artwork details and toggle the saved state', () => {
    component.artwork = {
      title: 'Gold Token Riftbound',
      author: 'Dani Avila',
      categories: ['Personajes', 'Portfolio'],
      likes: 3578,
      price: '35€',
      portfolioUrl: '/portfolio/dani-avila',
    };
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Gold Token Riftbound');
    expect(element.textContent).toContain('Dani Avila');
    expect(element.textContent).toContain('Personajes · Portfolio');
    expect(element.textContent).toContain('3578');
    expect(element.textContent).toContain('35€ - Ver portfolio');
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      '/portfolio/dani-avila',
    );

    const saveButton = element.querySelector('button') as HTMLButtonElement;
    saveButton.click();
    fixture.detectChanges();

    expect(saveButton.getAttribute('aria-pressed')).toBe('true');
    expect(saveButton.getAttribute('aria-label')).toBe('Quitar de guardados');
  });
});
