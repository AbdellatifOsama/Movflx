import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }
  registerForm:FormGroup = new FormGroup({
    firstName: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
    lastName: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.email]),
    phonenumber: new FormControl(null,[Validators.pattern(/^\+?[1-9][0-9]{7,14}$/)]),
    password: new FormControl(null,[Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    confirmpassword: new FormControl(null,[Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })
  ngOnInit(): void {
  }
  submit(){
    console.log(this.registerForm.value)
    this._AuthService.Register(this.registerForm).subscribe(
      (response)=>{
        console.log(response)
      }
    )
  }
}
