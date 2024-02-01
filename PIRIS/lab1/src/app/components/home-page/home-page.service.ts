import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCard } from '../user/user-card/user-card.typings';
import { UserApiService } from '../../api/user/user-api.service';
import { User } from '../user/user.typings';

@Injectable()
export class HomePageService {
  constructor(private userApiService: UserApiService) {}

  public getUserCards(): Observable<UserCard[]> {
    return this.userApiService.getUsers();
  }

  public addUser(user: User): Observable<void> {
    return this.userApiService.addUser(user);
  }

  public removeUser(id: string): Observable<void> {
    return this.userApiService.removeUser(id);
  }
}
