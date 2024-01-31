import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserCard } from '../user/user-card/user-card.typings';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public readonly userCardList: UserCard[] = [
    {
      firstName: 'lolkasdflkajsdfasjdlfkasjldfjlasdjflasdjlka',
      lastName: 'lol2a',
      passportNumber: 'num123',
      passportSeries: 'ser132',
    },
    {
      firstName: 'lolka23',
      lastName: 'lol2a2111',
      passportNumber: 'num3',
      passportSeries: 'ser3',
    },
    {
      firstName: 'muschik',
      lastName: 'lampas',
      passportNumber: 'num4',
      passportSeries: 'ser4',
    },
  ];

  public showAddUserModal(): void {
    console.log('show modal');
  }
}
