import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '@services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './pokemon-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent implements OnInit {
  private _aRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  private _title = inject(Title);
  private _meta = inject(Meta);

  private _pokemonService = inject(PokemonsService);
  public pokemon = signal<string>('');

  public pokemonDetail = computed(() => {
    if (!this.pokemon()) return;
    return this._pokemonService.pokemonsDetail()[this.pokemon()];
  });



  constructor() {
    toObservable(this.pokemonDetail).subscribe({
      next: (pokemonDetail) => {
        if (pokemonDetail) {
          this._title.setTitle(pokemonDetail.name);
          this._meta.updateTag({ name: 'description', content: `Página del Pokémon ${pokemonDetail.name}` });
          this._meta.updateTag({ name: 'og:title', content: `#${pokemonDetail.id} - ${pokemonDetail.name}` });
          this._meta.updateTag({ name: 'og:description', content: `Página del Pokémon ${pokemonDetail.name}` });
          this._meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png` });
        }
      }
    });
  }
  ngOnInit(): void {
    try {
      const pokemon = this._aRoute.snapshot.paramMap.get('pokemon');
      if (!pokemon) {
        this._router.navigate(['/404']);
        return;
      }
      this.pokemon.set(pokemon);
      this._pokemonService.getPokemonByName(pokemon);
    } catch (error) {
      console.log('Alerta: pokemon no encontrado');
    }
  }
}
