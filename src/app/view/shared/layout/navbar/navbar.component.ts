import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: `
    .active {
      @apply text-blue-500 underline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
}
