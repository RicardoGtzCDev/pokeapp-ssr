import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { GetPokemonByIdResponse } from '@models/dtos/get-pokemon-by-id.dto';
import { GetPokemonsResponse, SimplePokemon } from '@models/dtos/get-pokemon.dto';
import { PokemonDetail } from '@models/types/pokemon-detail.type';
import { distinctUntilChanged, isObservable, map, Observable, skip, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private _http = inject(HttpClient);
  private static readonly itemsPerPage = 20;

  public page = signal(-1);
  public pokemons: WritableSignal<SimplePokemon[]> = signal([]);
  public pokemonsDetail: WritableSignal<PokemonDetail> = signal({});

  constructor() {
    toObservable(this.page)
      .pipe(
        skip(1),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      ).subscribe({
        next: (page) => {
          this._loadPage(page).pipe(
            map((response) => response.results.map((result) => ({
              id: parseInt(result.url.split('/').at(-2) ?? '0'),
              ...result,
            } satisfies SimplePokemon) as SimplePokemon)),
          ).subscribe({
            next: (response) => {
              this.pokemons.set(response);
            }
          });
        },
      });
  }

  public getPokemonByName(pokemonName: string) {
    const alreadyExists = pokemonName in this.pokemonsDetail;
    if (!alreadyExists) {
      this._http.get<GetPokemonByIdResponse>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      ).subscribe({
        next: (response) => {
          this.pokemonsDetail.update((current) => ({ ...current, [pokemonName]: response }));
        },
        error: (error) => { throw Error(error) },
      })
    }
  }

  private _loadPage(page: number): Observable<GetPokemonsResponse> {
    const offset = PokemonsService.itemsPerPage * page;
    const limit = PokemonsService.itemsPerPage;
    return this._http.get<GetPokemonsResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
  }





}
