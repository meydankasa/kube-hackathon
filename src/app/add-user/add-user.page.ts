import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  users;
  list;
  groupId;
  constructor(private ar: ActivatedRoute,private service:SearchService) { }

  ngOnInit() {
    this.ar.params.subscribe((data:any) =>{
      if (data) {
        this.groupId = data.groupId;
        console.log(this.groupId);
        
      }
    })
  
  }

  search(e){
    let name = e.target.value
    if (name.length > 0) {
      this.service.searchUser(e.target.value).subscribe((users) => {
        if (users) {
          this.users = users;
        }
      })
    }
  }
  addUser(uid,gid){
    // console.log(uid,gid);
    
    this.service.addUser(uid,gid);
  }
}
