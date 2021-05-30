import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Users } from 'src/app/models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  authError: any;

  constructor(private toastController:ToastController,
    private route: Router,
    private ar: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.formInit()
    this.checkServerErrors();
  }
  navLogin(){
    this.route.navigate(['']);
  }

  formInit(){
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(2)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('',)

    })
  }

  checkServerErrors() {
    this.authService.eventAuthError$.subscribe(data => {
      if (data) {
        this.authError=data;    
      }
    })
  }

  createUser(form:FormGroup) {
    let user: Users = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
    }

    this.authService.createUser(user);
    form.reset()
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

  

}

