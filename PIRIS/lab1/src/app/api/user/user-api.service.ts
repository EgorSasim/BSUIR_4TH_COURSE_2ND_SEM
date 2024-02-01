import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { User } from '../../components/user/user.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  public getSortedUsers(): Observable<User[]> {
    const usersCollectionRef: Observable<User[]> = this.store
      .collection(this.usersCollectionName, (ref) => ref.orderBy('lastName'))
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
      .valueChanges()
      .pipe(
        map((user: User) => ({
          ...user,
          dateOfIssue: user?.dateOfIssue
            ? new Date(user?.dateOfIssue?.['seconds'] * 1000)
            : null,
          birthDate: user?.birthDate
            ? new Date(user?.birthDate?.['seconds'] * 1000)
            : null,
        }))
      );
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

  private areSameUsers(existedUser, user) {
    return (
      existedUser.identificationNumber === user.identificationNumber ||
      (existedUser.passportNumber === user.passportNumber &&
        existedUser.passportSeries === user.passportSeries)
    );
  }
}
