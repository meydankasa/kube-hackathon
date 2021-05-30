import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from './groups.service';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage implements OnInit {
  
  dataAvailable:boolean;

  groupsList:{}[];
  constructor(private router:Router,
     private service:GroupsService,
     private s:AuthenticationService) {}

  ngOnInit(){
    this.getGroupsList();
    // this.addUser();
    
  }

  getGroupsList(){
    return this.service.getUserId()
    .then((id) => {
      this.service.getGroups(id)
      .subscribe((data) => {
        if (data) {
          this.dataAvailable=true;
          this.groupsList = data;                 
        }
      })
    })
  }

  addUser(){
   // this.service.addUserToGroup('itzshak100@gmail.com',);
  }

}
