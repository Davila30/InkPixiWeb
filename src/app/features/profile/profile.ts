import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  protected readonly featuredWorks = [
    { title: 'Huellas', category: 'Retratos', artClass: 'art-portrait' },
    { title: 'Al bosque', category: 'Escenarios para WOW', artClass: 'art-forest' },
    { title: 'Arquitectura del bosque', category: 'Diseño de personaje', artClass: 'art-sketch' },
    { title: 'Nuevos aires', category: 'Diseño de personaje', artClass: 'art-figure' },
    { title: 'Dark Alleyway #2', category: 'Diseño de personaje', artClass: 'art-dark' },
    { title: 'Glub Glub', category: 'Diseño de personaje', artClass: 'art-creature' },
  ];
}
