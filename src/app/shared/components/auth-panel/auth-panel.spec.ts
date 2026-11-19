import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthPanel } from './auth-panel';

describe('AuthPanel', () => {
  let component: AuthPanel;
  let fixture: ComponentFixture<AuthPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPanel],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display brand and artwork illustration', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.logo-img')?.getAttribute('src')).toBe('/inkPixLogo.png');
    expect(el.textContent).toContain('El hogar de tus ideas');
    expect(el.querySelector('.artwork-slot')).toBeTruthy();
    const img = el.querySelector('.artwork-image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/auth-illustration.png');
  });
});
