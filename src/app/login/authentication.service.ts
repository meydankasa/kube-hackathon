import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/Users';
import { LoadingService } from '../services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private load: LoadingService,
  ) { }

  createUser(user: Users) {
    this.load.presentLoader('אנא המתן...')
    .then(() => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;

        userCredential.user.updateProfile(
          {
            displayName: user.firstName + ' ' + user.lastName,
          });
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(["tabs"]);
            this.load.dismissLoader();
          })
      })
      .catch((error) => {
        this.load.dismissLoader();
        console.log('dismiss');

        this.eventAuthError.next(error);
      })
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      id: userCredential.user.uid,
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'network user'
    })
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        // this.router.navigate(["login"]);
      })
  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.load.presentLoader('מתחבר...')
      .then(() => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .catch((error) => {
            this.load.dismissLoader();
            this.eventAuthError.next(error);
          })
          .then(userCredential => {
            if (userCredential) {

              this.router.navigate(["tabs"]);
              this.load.dismissLoader()
            }
            this.load.dismissLoader()
          })
      })
  }
}
