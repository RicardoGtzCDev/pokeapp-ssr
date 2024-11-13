import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () => import('@pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about/about-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('@pages/pricing/pricing-page.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('@pages/contact/contact-page.component')
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found-page.component')
  }
];
