import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthPanel } from '../../../shared/components/auth-panel/auth-panel';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-login',
  imports: [RouterLink, AuthPanel, Footer],
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {}
