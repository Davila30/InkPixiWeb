import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthPanel } from '../../../shared/components/auth-panel/auth-panel';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-register',
  imports: [RouterLink, AuthPanel, Footer],
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {}
