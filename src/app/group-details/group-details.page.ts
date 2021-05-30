import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
})
export class GroupDetailsPage implements OnInit {
  group:any;
  members;
  subscribe:any;
  constructor(private router:Router,private ar:ActivatedRoute,private service:GroupsService) { }

  ngOnInit() {
    this.ar.params.subscribe((data:any) => {
      if (data) {    
        this.group=data; 
        console.log(data);
        this.getGroupMembers(data.id)
      }
    })
  }

  navBack(){
    this.router.navigate([""]);
  }

  getGroupMembers(gid){
    this.service.getGroupMembers(gid).subscribe((data) => {
      this.members = data;
    })
  }
  navAddUser(){
    this.router.navigate(["add-user"]);
  }

}
