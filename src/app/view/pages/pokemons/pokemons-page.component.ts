import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../shared/pokemons/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../shared/pokemons/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit {
  private _appRef = inject(ApplicationRef);

  public isLoading = signal(true);

  constructor() {
    this._appRef.isStable
      .pipe(
        takeUntilDestroyed()
      ).subscribe({
        next: (isStable) => {
          console.log(isStable);
        },
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  }

}
