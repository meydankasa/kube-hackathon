import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { LoadingService } from '../services/loading/loading.service';
import { query } from '@angular/core/src/render3';
import uniq from 'lodash/uniq'
import { ToastService } from '../services/toast/toast.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  groupSub:any;
  userSub:any;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private loader: LoadingService,
    private toast : ToastService,
    private location : Location
  ) { }

  searchUser(name){
    //return this.db.collection('Users').valueChanges()
    return this.db.collection('Users', ref => {
      return ref.where('firstName','>=',name)
    }).valueChanges();
  }

  async addUser(uid,gid){
    this.groupSub = this.db.doc(`Users/${uid}`).valueChanges().subscribe((data:any) => {
      let gArr:string[]
      if (data) {
         gArr = data.groupsIds;
        if (gArr) {
          gArr.push(gid)
        }
        else{
          gArr = [gid]
        }
           
        this.db.doc(`Users/${uid}`).update({
          groupsIds : uniq(gArr)
        })
        this.groupSub.unsubscribe();
      }
    })

    this.userSub = this.db.doc(`Groups/${gid}`).valueChanges().subscribe((data:any) => {
      if (data) {
        let membersArr:string[] = data.membersId;
        membersArr.push(uid);
        this.db.doc(`Groups/${gid}`).update({
          membersId : uniq(membersArr)
        })
        this.userSub.unsubscribe();
      }
    })
    this.location.back();
    this.toast.presentToast('חבר חדש נוסף לקבוצה.','success');

  }
}
