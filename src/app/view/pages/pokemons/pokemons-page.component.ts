import { ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../shared/pokemons/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../shared/pokemons/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { PokemonsService } from '@services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit {
  private _aRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  private _title = inject(Title);

  private _pokemonsService = inject(PokemonsService);

  public pokemons = computed(() => this._pokemonsService.pokemons());
  public currentPage = computed(() => this._pokemonsService.page() + 1);

  // private _appRef = inject(ApplicationRef);
  // public isLoading = signal(true);

  constructor() {
    // this._appRef.isStable
    //   .pipe(
    //     takeUntilDestroyed()
    //   ).subscribe({
    //     next: (isStable) => {
    //       console.log(isStable);
    //     },
    //   });

    toObservable(this.currentPage).pipe(
      tap((currentPage) => { this._title.setTitle(`Pokémon SSR - Page ${currentPage}`) }),
      takeUntilDestroyed(),
    ).subscribe({
      next: (currentPage) => { this._updateQueryParamPage(currentPage); }
    });
  }

  ngOnInit(): void {
    const queryPage = this._aRoute.snapshot.queryParamMap.get('page');
    let page: number = 0;
    if (queryPage && !isNaN(+queryPage)) { page = +queryPage - 1; }
    this._loadPage(page);

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }


  public nextPage() {
    this._pokemonsService.page.update((current) => Math.max(0, current + 1));
  }

  public prevPage() {
    this._pokemonsService.page.update((current) => Math.max(0, current - 1));
  }

  private _loadPage(page: number) {
    this._pokemonsService.page.set(page);
  }

  private _updateQueryParamPage(page: number) {
    this._router.navigate([], { queryParams: { page } })
  }
}
