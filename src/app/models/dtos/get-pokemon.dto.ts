export interface GetPokemonsResponse {
  count: number;
  next: string;
  previous: string;
  results: GetPokemonsResult[];
}

export interface GetPokemonsResult {
  name: string;
  url: string;
}

export interface SimplePokemon extends GetPokemonsResult {
  id: number,
}
