import { Location } from "@angular/common";
import { ComponentFixture, TestBed, tick } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { AppComponent } from "app/app.component";
import { routes } from "app/app.routes";

describe('App routes', () => {
  let router: Router;
  let location: Location;

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('Should navigate to "/about"', async () => {
    await router.navigate(['/about']);
    expect(location.path()).toBe('/about');
  });

  it('Should navigate to "/pokemons" when path is root', async () => {
    await router.navigate(['/']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('Should be defined wildCard path', async () => {
    const wildcardPage = routes.find((route) => route.path === '**')!;
    expect(wildcardPage).toBeDefined();
  });
});
