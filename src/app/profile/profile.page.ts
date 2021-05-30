import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  user:firebase.User;
  constructor(private service:AuthenticationService) { }

  ngOnInit() {
    this.service.getUserState().subscribe(user => {
      this.user = user;
    })
  }

  logout(){
    this.service.logout();
  }
}
