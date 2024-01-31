import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserCard } from './user-card.typings';

@Component({
  selector: 'app-user-card',
  templateUrl: 'user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() public card: UserCard;
}
