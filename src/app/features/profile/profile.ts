import { Component } from '@angular/core';
import { ArtCard } from '../../shared/components/art-card/art-card';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Artwork } from '../../shared/models/artwork';

@Component({
  selector: 'app-profile',
  imports: [Navbar, ArtCard, Footer],
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  protected readonly featuredWorks: Artwork[] = [
    { id: 101, title: 'Huellas', category: 'Retratos', author: 'Dani Ávila', imageUrl: null, price: null, likes: 142 },
    { id: 102, title: 'Al bosque', category: 'Escenarios', author: 'Dani Ávila', imageUrl: null, price: 45, likes: 380 },
    { id: 103, title: 'Arquitectura del bosque', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: null, likes: 215 },
    { id: 104, title: 'Nuevos aires', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: 60, likes: 512 },
    { id: 105, title: 'Dark Alleyway #2', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: null, likes: 98 },
    { id: 106, title: 'Glub Glub', category: 'Criaturas', author: 'Dani Ávila', imageUrl: null, price: 25, likes: 320 },
  ];
}
