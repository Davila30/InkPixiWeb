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
     fixture.componentRef.setInput('artwork', {
      id: 1,
      title: 'Sol y nube',
      imageUrl: null,
      author: 'Dani Ávila',
      category: 'Escenarios',
      price: null,
      likes: 248,
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
