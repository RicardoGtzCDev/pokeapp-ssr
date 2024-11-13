import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle('Contact page');
    this._meta.updateTag({ name: 'description', content: 'Página con informacion de contacto' });
    this._meta.updateTag({ name: 'og:title', content: 'Contact page' });
    this._meta.updateTag({ name: 'keywords', content: 'contact' });
  }
}
