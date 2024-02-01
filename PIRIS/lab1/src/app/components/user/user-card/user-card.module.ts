import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserCardComponent],
  imports: [MatIconModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}
