import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup ;

  constructor( public navCtrl: NavController, 
  			       public navParams: NavParams,
  	           public builder: FormBuilder,
  	           public alertCtrl: AlertController) {
  	
  	this.loginForm = this.builder.group({
  			'username' : ['',Validators.compose([Validators.required,Validators.minLength(5)])],
  			'password' : ['',Validators.compose([Validators.required,Validators.minLength(5)])]
  		}) ;
  }

  validate() : boolean {
 
  	if (this.loginForm.valid){
  		return true ;
  	}
    // check which field causes invalid
    let errorMsg:string = '' ;
    // validate each field -> start with username
  	let control = this.loginForm.controls['username'] ;
  	if (control.invalid){
  		if (control.errors['required']){
  			errorMsg = 'Please provide a username.' ;
  		} else if (control.errors['minlength']) {
  			errorMsg = 'The username must have at least '+control.errors['minlength'].requiredLength+' characters.' ; 
  		}
  	} else {
      let control = this.loginForm.controls['password'] ;
      if (control.invalid){
        if (control.errors['required']){
          errorMsg = 'Please provide a password.' ;
        } else if (control.errors['minlength']) {
          errorMsg = 'The password must have at least '+control.errors['minlength'].requiredLength+' characters.' ;
        }
      }      
    }

  	let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    // show alert with error message
    alert.present();

    return false ;
  }

  submit(): void {
  	if (this.validate()){
  		console.log(this.loginForm.value) ;
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
