import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: any;
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      subscribeEemail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }


  submitForm() {
    !this.form.valid ? this.presentErrorAlert() : this.presentSuccessAlert();
  
  }

  
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader:
        'please insert your email correctly',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Thanks you , your email has been saved',
      buttons: ['OK'],
    });
    await alert.present();
    this.form.reset();
  }

}
