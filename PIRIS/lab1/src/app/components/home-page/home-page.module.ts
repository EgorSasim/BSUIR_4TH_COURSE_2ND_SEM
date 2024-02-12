import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [HomePageComponent],
  imports: [MatGridListModule],
})
export class HomePageModule {}
