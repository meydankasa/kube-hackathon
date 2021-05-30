import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private toastController:ToastController,
    private route: Router,
    private ar: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.checkServerErrors()
  }

  async presentToast(error:string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 4000,
      color: 'danger',
      position: 'top',
      cssClass: 'text-right'
    });
    toast.present();
  }

  checkServerErrors() {
    this.authService.eventAuthError$.subscribe(data => {
      this.authError = data;
      if (this.authError) {
        this.presentToast(this.authError.message);
        this.authError=null;
      }
    })
  }

  navRegister(){
    this.route.navigate(['register'])
  }

  login(form) {
    if (!form.value.loginEmail || !form.value.loginPassword) {
      this.presentToast('אחד מפרטי המידע חסר! וודא שהקשת הכל.')
    }
    else {
      this.authService.login(form.value.loginEmail, form.value.loginPassword,)
      form.resetForm();     
    }
  }
}