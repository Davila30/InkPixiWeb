import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthPanel } from '../../../shared/components/auth-panel/auth-panel';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-register',
  imports: [RouterLink, AuthPanel, Footer],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-screen',
  },
})
export class Register {}