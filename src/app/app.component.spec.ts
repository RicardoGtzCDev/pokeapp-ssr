import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/layout/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  @Component({
    selector: 'navbar',
    standalone: true,
  })
  class NavbarComponentMock { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).overrideComponent(AppComponent, {
      add: {
        imports: [NavbarComponentMock],
      },
      remove: {
        imports: [NavbarComponent]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the '2-pokemon-ssr' title`, () => {
    expect(app.title).toEqual('2-pokemon-ssr');
  });

  it('should render navbar', () => {
    const navbar = compiled.querySelector('navbar');
    expect(navbar).not.toBeNull();
  });

  it('should render router-outlet', () => {
    const navbar = compiled.querySelector('router-outlet');
    expect(navbar).not.toBeNull();
  });
});
