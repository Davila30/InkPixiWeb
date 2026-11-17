import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the artist profile and featured works', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Dani Ávila - @MainYuumi');
    expect(element.textContent).toContain('Obras destacadas');
    expect(element.textContent).toContain('Un vistazo a mis mundos');
    expect(element.textContent).toContain('Huellas');
    expect(element.textContent).toContain('Glub Glub');
    expect(element.querySelectorAll('.featured-work').length).toBe(6);
  });
});
