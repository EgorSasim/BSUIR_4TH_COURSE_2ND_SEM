import { Injectable } from '@angular/core';
import { UserCard } from '../../components/user/user-card/user-card.typings';
import { Observable, from, of, tap } from 'rxjs';
import { User } from '../../components/user/user.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private store: AngularFirestore) {}
  // private users: User[] = [
  //   {
  //     firstName: 'lolkasdflkajsdfasjdlfkasjldfjlasdjflasdjlka',
  //     lastName: 'lol2a',
  //     passportNumber: 'num123',
  //     passportSeries: 'ser132',
  //     actualResidenceAddress: 'adsfa',
  //     actualResidenceCity: UserCity.Baranovichi,
  //     birthDate: new Date(),
  //     citizenship: UserCitizenship.Russia,
  //     conscript: true,
  //     dateOfIssue: new Date(),
  //     disability: UserDisability.DotaPlusPlayer,
  //     identificationNumber: 'dsafsdf',
  //     issuedBy: 'someone',
  //     martialStatus: UserMartialStatus.Single,
  //     middleName: 'asdfasd',
  //     monthlyIncome: 2321.23,
  //     pensionary: false,
  //     placeOfBirth: 'asdf',
  //     email: 'some@mail.ru',
  //     homePhoneNumber: '8023233242',
  //     mobilePhoneNumber: '923840238',
  //     workPlace: 'asshole',
  //     workPosition: 'skdjflaksdf',
  //   },
  //   {
  //     firstName: 'lolkasdflkajsdfasjdlfkasjldfjlasdjflasdjlka',
  //     lastName: 'lol2a',
  //     passportNumber: 'num123',
  //     passportSeries: 'ser132',
  //     actualResidenceAddress: 'adsfa',
  //     actualResidenceCity: UserCity.Baranovichi,
  //     birthDate: new Date(),
  //     citizenship: UserCitizenship.Russia,
  //     conscript: true,
  //     dateOfIssue: new Date(),
  //     disability: UserDisability.DotaPlusPlayer,
  //     identificationNumber: 'dsafsdf',
  //     issuedBy: 'someone',
  //     martialStatus: UserMartialStatus.Single,
  //     middleName: 'asdfasd',
  //     monthlyIncome: 2321.23,
  //     pensionary: false,
  //     placeOfBirth: 'asdf',
  //     email: 'some@mail.ru',
  //     homePhoneNumber: '8023233242',
  //     mobilePhoneNumber: '923840238',
  //     workPlace: 'asshole',
  //     workPosition: 'skdjflaksdf',
  //   },
  //   {
  //     firstName: 'lolkasdflkajsdfasjdlfkasjldfjlasdjflasdjlka',
  //     lastName: 'lol2a',
  //     passportNumber: 'num123',
  //     passportSeries: 'ser132',
  //     actualResidenceAddress: 'adsfa',
  //     actualResidenceCity: UserCity.Baranovichi,
  //     birthDate: new Date(),
  //     citizenship: UserCitizenship.Russia,
  //     conscript: true,
  //     dateOfIssue: new Date(),
  //     disability: UserDisability.DotaPlusPlayer,
  //     identificationNumber: 'dsafsdf',
  //     issuedBy: 'someone',
  //     martialStatus: UserMartialStatus.Single,
  //     middleName: 'asdfasd',
  //     monthlyIncome: 2321.23,
  //     pensionary: false,
  //     placeOfBirth: 'asdf',
  //     email: 'some@mail.ru',
  //     homePhoneNumber: '8023233242',
  //     mobilePhoneNumber: '923840238',
  //     workPlace: 'asshole',
  //     workPosition: 'skdjflaksdf',
  //   },
  // ];

  public getUsers(): Observable<UserCard[]> {
    const usersCollectionRef: Observable<UserCard[]> = this.store
      .collection('users')
      .valueChanges()
      .pipe(tap((val) => console.log('val: ', val))) as Observable<UserCard[]>;
    return usersCollectionRef;
  }

  public addUser(user: User): Observable<void> {
    const usersCollectionRef = this.store.collection('users');
    return from(
      usersCollectionRef.doc(user.identificationNumber).set({ ...user })
    );
  }

  public getUser(identificationNumber): Observable<User> {
    const userDocumentRef = this.store
      .collection('users')
      .doc(identificationNumber)
      .valueChanges();
    return userDocumentRef as Observable<User>;
  }

  public updateUser(user: User): Observable<void> {
    const userDocumentRef = this.store
      .collection('users')
      .doc(user.identificationNumber)
      .update(user);
    return from(userDocumentRef);
  }
}
