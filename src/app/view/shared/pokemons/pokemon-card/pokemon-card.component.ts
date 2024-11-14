import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplePokemon } from '@models/dtos/get-pokemon.dto';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {
  public simplePokemon = input.required<SimplePokemon>();

  public spriteUrl = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.simplePokemon().id}.png`)

}
