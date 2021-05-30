import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Users } from '../models/Users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { log } from 'util';
import { LoadingService } from '../services/loading/loading.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Register
  authError: any;

  constructor(private route: Router,
    private authService: AuthenticationService,private toastController:ToastController) { }

  ngOnInit() {
  }
}
