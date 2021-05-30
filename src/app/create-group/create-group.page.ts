import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups/groups.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  date:string

  constructor(private service: GroupsService,
    private toastController:ToastController) { }

  ngOnInit() {
    
    
  }
  


  createGroup(form){
    console.log(form.value);
    if (!form.value.groupName) {
      this.presentToast('יש למלא את השדות!')
    }
    else{
      form.value.dateOfMeetup = new Date(form.value.dateOfMeetup).toLocaleDateString();
      this.service.createGroup(form.value);
    }
    
  }

  async presentToast(error) {
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
