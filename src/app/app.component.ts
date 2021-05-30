import { Component, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { GroupsService } from './groups/groups.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  
})
export class AppComponent {
  loader:boolean=true;
  // login:boolean = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cd: ChangeDetectorRef,
    private router: Router,
    private service:GroupsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
    });
    setTimeout(()=>{this.loader=false},1000); 
      this.router.navigateByUrl('');
  }
}
