import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '@services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
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
  public pokemonId = signal(0)

  public pokemon = computed(() => {
    if (!this.pokemonId()) return;
    return this._pokemonService.pokemonsDetail()[this.pokemonId()];
  });



  constructor() {
    toObservable(this.pokemon).subscribe({
      next: (pokemon) => {
        if (pokemon) {
          this._title.setTitle(pokemon.name);
          this._meta.updateTag({ name: 'description', content: `Página del Pokémon ${pokemon.name}` });
          this._meta.updateTag({ name: 'og:title', content: `#${this.pokemonId()} - ${pokemon.name}` });
          this._meta.updateTag({ name: 'og:description', content: `Página del Pokémon ${pokemon.name}` });
          this._meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId()}.png` });
        }
      }
    });
  }
  ngOnInit(): void {
    try {
      const pokemonId = this._aRoute.snapshot.paramMap.get('pokemonId');
      if (!pokemonId || isNaN(+pokemonId)) {
        this._router.navigate(['/404']);
        return;
      }
      this.pokemonId.set(+pokemonId);
      this._pokemonService.getPokemonById(+pokemonId);
    } catch (error) {
      console.log('Alerta: pokemon no encontrado');
    }
  }
}
