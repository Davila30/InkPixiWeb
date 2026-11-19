import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links including Descubrir', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Inicio');
    expect(el.textContent).toContain('Descubrir');
    expect(el.textContent).toContain('Perfil');
    expect(el.textContent).toContain('Entrar / Registro');
  });

  it('should render the logo image', () => {
    const el = fixture.nativeElement as HTMLElement;
    const img = el.querySelector('.logo-img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/inkPixLogo.png');
  });
});
