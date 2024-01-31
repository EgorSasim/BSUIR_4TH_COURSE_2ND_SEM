import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from '../header/header.module';
import { UserCardListModule } from '../user/user-card-list/user-card-list.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HeaderModule, UserCardListModule, MatButtonModule, MatIconModule],
})
export class HomePageModule {}
