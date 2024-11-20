import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '@models/dtos/get-pokemon.dto';
import { PokemonCardComponent } from '@shared/pokemons/pokemon-card/pokemon-card.component';

const pokemonMock: SimplePokemon = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
}

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('simplePokemon', pokemonMock);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have simplePokemon value`, () => {
    expect(component.simplePokemon()).toEqual(pokemonMock);
  });

  it(`should render "h2" pokemon name`, () => {
    const name = compiled.querySelector('h2')?.textContent?.trim();
    expect(name).toBe(pokemonMock.name);
  });

  it(`should render image`, () => {
    const src = compiled.querySelector('img')?.src;
    expect(src).toBe(component.spriteUrl());
  });

  it(`should have routerLink redirection`, () => {
    const div = compiled.querySelector('div');
    expect(div?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${pokemonMock.name}`);
  });

});
