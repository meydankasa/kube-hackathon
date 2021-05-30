import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { defineBase } from '@angular/core/src/render3';
import { AuthenticationService } from '../login/authentication.service';
import { database } from 'firebase';
import { LoadingService } from '../services/loading/loading.service';
import uniq from 'lodash/uniq'

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private authSer: AuthenticationService,
    private loader: LoadingService
  ) { }

  subsciber: any;
  id: string;
  // group = {};

  createGroup({ groupName, description, dateOfMeetup }) {
    let id = this.db.createId();
    let uid = this.afAuth.auth.currentUser.uid;
    let gid;
    let groupToAdd = {
      id: id,
      groupName,
      description,
      dateOfMeetup,
      membersId: [uid],
      dateOfCreation: new Date().toLocaleDateString()
    }
    this.db.collection('Groups').add(groupToAdd)

    this.db.collection('Groups', ref => {
      return ref.where('id', '==', id)
    }).snapshotChanges().subscribe((data) => {
      if (data[0]) {
        gid = data[0].payload.doc.id
        this.db.doc(`Groups/${gid}`).update({
          id: data[0].payload.doc.id
        }).then((res) => {

          this.subsciber = this.db.doc(`Users/${uid}`).valueChanges().subscribe((res: any) => {
            console.log(res);
            if (res && res.groupsIds) {
              let gArr: string[] = res['groupsIds']
              gArr.push(gid)
              this.db.doc(`Users/${uid}`).update({
                groupsIds: uniq(gArr)
              })
              this.subsciber.unsubscribe()
            }

            else {
              this.db.doc(`Users/${uid}`).update({
                groupsIds: uniq([gid])
              })
              this.subsciber.unsubscribe()
            }
            // let gArr:string[] = res['groupsIds']
            // gArr.push(gid)

            // this.db.doc(`Users/${uid}`).update({
            //   groupsIds : gArr
            // })
          })
          this.router.navigate(['tabs/groups'])
        })
      }
    })

  }

  addToGroups(id: string, uid: string) {

    const sub = this.db.collection('Groups', ref => ref.where('id', '==', id))
      .snapshotChanges().subscribe((data) => {
        if (data && data[0]) {
          const gid = data[0].payload.doc.id;
          this.db.doc(`Groups/${gid}`).update({
            id: data[0].payload.doc.id
          })
          this.updateGroupsIds(uid, gid)
        }
      })
    sub.unsubscribe();

  }

  updateGroupsIds(uid, gid) {
    this.subsciber = this.db.doc(`Users/${uid}`).valueChanges().subscribe((res: any) => {
      console.log(res);
      if (res && res.groupsIds) {
        let gArr: string[] = res['groupsIds']
        gArr.push()
        this.db.doc(`Users/${uid}`).update({
          groupsIds: uniq(gArr)
        })
      }

      else {
        this.db.doc(`Users/${uid}`).update({
          groupsIds: uniq([gid])
        })
        this.subsciber.unsubscribe()
      }
      // let gArr:string[] = res['groupsIds']
      // gArr.push(gid
      // this.db.doc(`Users/${uid}`).update({
      //   groupsIds : gArr
      // })
    })
    this.router.navigate(['tabs/groups'])
  }


  getGroups(id) {
    return this.db.collection('Groups', ref => {
      return ref.where('membersId', 'array-contains', id);
    }).valueChanges()
  }

  getUserId() {
    let p = new Promise((resolve, reject) => {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          return resolve(user.uid);
        }
        return reject('no user');
      })
    })
    return p
  }

  addUserToGroup(email: string, gid: string) {
    // this.db.doc(`Users/email/itzshak100@gmail.com`).update({
    //   upTest:'test2'
    // })

    let uid;
    this.db.collection('Users', ref => {
      return ref.where('email', '==', email)
    }).valueChanges().subscribe((data) => {

      uid = data[0]['id'];
      let arr: string[] = data[0]['groupsIds'];
      arr.push(gid)
      this.db.doc(`Users/${data[0]['id']}`).update(
        {
          groupsIds: arr
        }
      )
      this.db.collection('Groups', ref => {
        return ref.where('id', '==', gid)
      }).valueChanges().subscribe((data) => {
        let gArr: string[] = data[0]['membersIds'];
        gArr.push(uid);
        this.db.doc(`Groups/${data[0]['id']}`).update({
          membersIds: gArr
        })
      })
    })
  }

  grtGroupDetails(id){
    return this.db.doc(`Groups/${id}`).valueChanges();
  }

  getGroupMembers(gid){
    return this.db.collection('Users', ref => {
      return ref.where('groupsIds', 'array-contains', gid);
    }).valueChanges()
  }
}
