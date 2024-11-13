import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle('Pricing page');
    this._meta.updateTag({ name: 'description', content: 'Página con informacion de precios' });
    this._meta.updateTag({ name: 'og:title', content: 'Pricing page' });
    this._meta.updateTag({ name: 'keywords', content: 'price' });
  }
}
