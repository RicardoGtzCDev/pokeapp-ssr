import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '@models/dtos/get-pokemon.dto';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {
  pokemons = input.required<SimplePokemon[]>();
}
