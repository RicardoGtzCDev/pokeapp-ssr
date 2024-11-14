import { GetPokemonByIdResponse } from "@models/dtos/get-pokemon-by-id.dto";

export type PokemonDetail = { [key: number]: GetPokemonByIdResponse; };
