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
    { id: 101, title: 'Huellas', description: 'Retrato intimista que explora la memoria y el paso del tiempo.', category: 'Retratos', author: 'Dani Ávila', imageUrl: null, price: null, likes: 142 },
    { id: 102, title: 'Al bosque', description: 'Paisaje boscoso envuelto en una suave niebla matinal.', category: 'Escenarios', author: 'Dani Ávila', imageUrl: null, price: 45, likes: 380 },
    { id: 103, title: 'Arquitectura del bosque', description: 'Concept art de cabañas orgánicas construidas entre raíces centenarias.', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: null, likes: 215 },
    { id: 104, title: 'Nuevos aires', description: 'Estudio de personaje en movimiento con trajes de viento.', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: 60, likes: 512 },
    { id: 105, title: 'Dark Alleyway #2', description: 'Escena nocturna cyberpunk con reflejos de lluvia en el asfalto.', category: 'Diseño de personaje', author: 'Dani Ávila', imageUrl: null, price: null, likes: 98 },
    { id: 106, title: 'Glub Glub', description: 'Criatura marina abisal con bioluminiscencia juguetona.', category: 'Criaturas', author: 'Dani Ávila', imageUrl: null, price: 25, likes: 320 },
  ];
}
