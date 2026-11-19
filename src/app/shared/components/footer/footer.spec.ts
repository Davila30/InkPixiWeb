import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display credits and authors', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('InkPixi');
    expect(el.textContent).toContain('2026 © Proyecto Intermodular de DAM');
    expect(el.textContent).toContain('Daniel Ávila');
    expect(el.textContent).toContain('Eduardo Heras');
    expect(el.textContent).toContain('Ismael Belhach');
  });
});
