import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SimplePokemon } from '@models/dtos/get-pokemon.dto';
import { PokemonsService } from '@services/pokemons.service';
import { of } from 'rxjs';

const expectedPokemons: SimplePokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
  },
  {
    id: 2,
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/'
  }
];

const pokemonsPageMock = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/'
    }
  ],
};

const pokemonMock = {
  id: 1,
  name: 'bulbasaur',
}

// const pokemonMock2 = {
//   id: 2,
//   name: 'ivysaur',
// }

describe('PokemonService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loadPage and fetch pokemons when page changes', () => {
    service.loadPage(1).subscribe((response) => {
      expect(response).toEqual(expectedPokemons);
    })
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(pokemonsPageMock);
  });


  it('should not make an HTTP call if the Pokémon already exists in pokemonsDetail', () => {
    service.pokemonsDetail = jasmine.createSpyObj('pokemonsDetail', ['update']);
    const pokemonName = 'pikachu';
    (service.pokemonsDetail as any)[pokemonName] = { name: pokemonName };
    service.getPokemonByName(pokemonName);
    httpMock.expectNone(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(service.pokemonsDetail.update).not.toHaveBeenCalled();
  });

  it('should fetch Pokémon data by name and call pokemonsDetail.update', () => {
    service.pokemonsDetail = jasmine.createSpyObj('pokemonsDetail', ['update']);
    service.getPokemonByName(pokemonMock.name);
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonMock.name}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemonMock);
    expect(service.pokemonsDetail.update).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should fetch Pokémon data by id and call pokemonsDetail.update', () => {
    service.pokemonsDetail = jasmine.createSpyObj('pokemonsDetail', ['update']);
    service.getPokemonByName(pokemonMock.id.toString());
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonMock.id.toString()}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemonMock);
    expect(service.pokemonsDetail.update).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should catch error when pokemon not found', () => {
    service.handleError = jasmine.createSpy('handleError');
    service.getPokemonByName('pokemon-not-found');
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pokemon-not-found');
    expect(req.request.method).toBe('GET');
    req.flush('Throw error', {
      status: 404,
      statusText: 'Not found',
    });
    expect(service.handleError).toHaveBeenCalled();
  });
});
