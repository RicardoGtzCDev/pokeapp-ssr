import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '@models/dtos/get-pokemon.dto';
import { PokemonListComponent } from '@shared/pokemons/pokemon-list/pokemon-list.component';

const pokemonsMock: SimplePokemon[] = [
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

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonListComponent);
    fixture.componentRef.setInput('pokemons', []);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render n pokemon-cards', () => {
    fixture.componentRef.setInput('pokemons', pokemonsMock);
    fixture.detectChanges();
    const cards = compiled.querySelectorAll('pokemon-card');
    expect(cards.length).toBe(pokemonsMock.length);
  });

  it('should render "No hay pokémons"', () => {
    const div = compiled.querySelector('div');
    const empty = div?.getElementsByTagName('div').item(0);
    expect(empty?.textContent?.trim()).toBe('No hay pokémons');
  });
});
