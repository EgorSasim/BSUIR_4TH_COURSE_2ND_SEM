import { Injectable } from '@angular/core';
import { UserCard } from '../../components/user/user-card/user-card.typings';
import { Observable, from, map, of, tap } from 'rxjs';
import { User } from '../../components/user/user.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly usersCollectionName = 'users';

  constructor(private store: AngularFirestore) {}

  public getUsers(): Observable<User[]> {
    const usersCollectionRef: Observable<User[]> = this.store
      .collection(this.usersCollectionName)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => {
            const data: User = change.payload.doc.data() as User;
            const id = change.payload.doc.id;
            return { id, ...data };
          })
        )
      ) as Observable<User[]>;
    return usersCollectionRef;
  }

  public addUser(user: User): Observable<void> {
    const usersCollectionRef = this.store.collection(this.usersCollectionName);
    delete user.id;
    return from(usersCollectionRef.doc().set({ ...user }));
  }

  public getUser(id: string): Observable<User> {
    const userDocumentRef = this.store
      .collection(this.usersCollectionName)
      .doc(id)
      .valueChanges();
    return userDocumentRef as Observable<User>;
  }

  public updateUser(user: User): Observable<void> {
    const userDocumentRef = this.store
      .collection(this.usersCollectionName)
      .doc(user.id)
      .update(user);
    return from(userDocumentRef);
  }

  public removeUser(id: string): Observable<void> {
    const usersCollectionRef = this.store.collection(this.usersCollectionName);
    return from(usersCollectionRef.doc(id).delete());
  }
}
