import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
  topics: any = [];
  form: any;
  // date
  currentYear: number = new Date().getFullYear();
  pastYears: number[] = [];
  months: string[] = [];
  days: number[] = [];
  monthLimit: number = 0;
  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.displayLast20years();
    this.displayMonths();
    this.displayDays(this.currentYear, 'January');
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      contact_name: new FormControl(null, [Validators.required]),
      contact_email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      child_name: new FormControl(null, [Validators.required]),
      child_dob_day: new FormControl('1', [Validators.required]),
      child_dob_month: new FormControl('January', [Validators.required]),
      child_dob_year: new FormControl(this.currentYear, [Validators.required]),
      child_grade: new FormControl(null, [Validators.required]),
      child_gender: new FormControl(null, [Validators.required]),
    });
  }

  // topics
  addToTopics(topic: string) {
    // if exist in array remove it
    if (this.topics.includes(topic)) {
      this.topics.splice(this.topics.indexOf(topic), 1);
      return;
    }
    // if length of array less than 3 items
    this.topics.length < 3 ? this.topics.push(topic) : '';
  }

  displayLast20years() {
    this.pastYears = []; // Clear the pastYears array
    for (let index = 20; index > 0; index--) {
      this.pastYears.push(this.currentYear - index + 1);
    }
  }

  displayMonths() {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  // check if year is leab
  leapYear(year: number) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  displayDays(year: any, month: any) {
    if (this.leapYear(year) && month == 'February') {
      // leapYear
      this.monthLimit = 30;
    }
    if (!this.leapYear(year) && month == 'February') {
      // not leapYear
      this.monthLimit = 29;
    }

    // 31 days months
    if (
      month == 'January' ||
      month == 'March' ||
      month == 'May' ||
      month == 'July' ||
      month == 'August' ||
      month == 'October' ||
      month == 'December'
    ) {
      this.monthLimit = 32;
    }

    // 30 days months
    if (
      month == 'April' ||
      month == 'June' ||
      month == 'September' ||
      month == 'November'
    ) {
      this.monthLimit = 31;
    }

    this.days = [];
    for (let index = 1; index < this.monthLimit; index++) {
      this.days.push(index);
    }
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader:
        'please fill all fields correctly , then press continue to payment',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Thanks you , we will contact you soon',
      buttons: ['OK'],
    });
    await alert.present();
  }

  submitForm() {
    !this.form.valid ? this.presentErrorAlert() : this.presentSuccessAlert();

    console.log('this.form', this.form.value);
    console.log(' this.topics', this.topics);
  }
}
