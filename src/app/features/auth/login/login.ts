import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthPanel } from '../../../shared/components/auth-panel/auth-panel';
import { Footer } from '../../../shared/components/footer/footer';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, AuthPanel, Footer],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-screen',
  },
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  login(): void {
    this.auth.login();
    void this.router.navigate(['/dashboard']);
  }
}