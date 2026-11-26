import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-not-found',
  imports: [Navbar, Footer, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex min-h-screen flex-col',
  },
  template: `
    <app-navbar />

    <main class="grid flex-1 place-items-center px-5 py-12">
      <section
        class="w-[min(520px,100%)] rounded-[24px] bg-ink-card p-10 text-center shadow-[0_18px_40px_rgba(67,49,93,0.1)]"
        aria-labelledby="not-found-title"
      >
        <p class="font-hand text-7xl font-bold text-ink-primary">404</p>
        <h1 id="not-found-title" class="mt-2 mb-3 text-2xl font-extrabold text-ink-main">
          Página no encontrada
        </h1>
        <p class="text-sm leading-relaxed text-ink-muted">
          Parece que este lienzo está en blanco. La ruta que buscas no existe o ha sido movida.
        </p>

        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a
            routerLink="/home"
            class="inline-flex items-center rounded-full bg-ink-primary px-6 py-2.5 text-sm font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </a>
          <a
            routerLink="/descubrir"
            class="inline-flex items-center rounded-full border border-ink-primary/30 bg-white/70 px-6 py-2.5 text-sm font-bold text-ink-primary no-underline transition-colors hover:bg-ink-primary hover:text-white"
          >
            Explorar catálogo
          </a>
        </div>
      </section>
    </main>

    <app-footer />
  `,
})
export class NotFound {}