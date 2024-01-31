import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserCard } from '../user-card/user-card.typings';

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardListComponent {
  @Input() cardList: UserCard[] = [];
}
