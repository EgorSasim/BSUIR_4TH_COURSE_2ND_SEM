import { Injectable } from '@angular/core';
import { Observable, from, map, of, tap } from 'rxjs';
import { User } from '../../components/user/user.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SameUserErrorCode } from './user-api.typings';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private usersCache: User[];
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
            return { ...data, id };
          })
        ),
        tap((users) => {
          this.updateUsersCache(users);
        })
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
        ),
        tap((users) => this.updateUsersCache(users))
      ) as Observable<User[]>;
    return usersCollectionRef;
  }

  public addUser(user: User): Observable<void> {
    if (this.isSameUserExists(user)) {
      return of();
    }
    const usersCollectionRef = this.store.collection(this.usersCollectionName);
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

  private showSameUserExistanceError(sameUserErrorCode: SameUserErrorCode) {
    switch (sameUserErrorCode) {
      case SameUserErrorCode.SameIdentificationNumber:
        alert('Error: Same identification number');
        return;
      case SameUserErrorCode.SamePassport:
        alert('Error: Same passport');
    }
  }

  private isSameUserExists(user: User): boolean {
    const isSameIdentificationNumber = this.usersCache.find(
      (cachedUser) =>
        cachedUser.identificationNumber === user.identificationNumber
    );
    if (isSameIdentificationNumber) {
      this.showSameUserExistanceError(
        SameUserErrorCode.SameIdentificationNumber
      );
      return true;
    }
    const isSamePassport = this.usersCache.find(
      (cachedUser) =>
        cachedUser.passportNumber === user.passportNumber &&
        cachedUser.passportSeries === user.passportSeries
    );
    if (isSamePassport) {
      this.showSameUserExistanceError(SameUserErrorCode.SamePassport);
      return true;
    }

    return false;
  }

  private updateUsersCache(users: User[]): void {
    this.usersCache = [...users];
  }
}
