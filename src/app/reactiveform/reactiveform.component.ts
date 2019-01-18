import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

function ratingRange(min, max): ValidatorFn {
  return function(c: AbstractControl): {[key: string]: boolean} | null {
            console.log('rating validation');
            if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
              console.log('rating validation');
              return {'range': true};
            }
            return null;
        };
}

function emailMatcher(c:AbstractControl):{[key:string]:boolean} | null{
  let confirmEmailControl = c.get('confirmEmail');
  let emailControl = c.get('email');
  console.log('email matcher',confirmEmailControl.value === emailControl.value);
  if(confirmEmailControl.value === emailControl.value){
    return null;
  }
  return {match:true};
}

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {
  reactiveformComponentInfo:string;
  customersForm: FormGroup;
  emailMessage : string;
  // these following messages can be served by service 
  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address. '
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.reactiveformComponentInfo = 'ngOninit of reactiveformComponentInfo';
    console.log(this.reactiveformComponentInfo);
    
    // this.customersForm = new FormGroup({
    //   firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    //   lastName: new FormControl('',),
    //   email: new FormControl(''),
    //   verify: new FormControl(true)
    // });

    this.customersForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup:this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail:['', [Validators.required, Validators.email]],
      }),
      phone: '',
      sendNotification: 'email',
      rating: ['', ratingRange(1, 5)],
      verify: 'true'
    });
    // observing changes for Validating Messages 
    const emailControl = this.customersForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(emailControl))

    // listening to changes in email and text radio button 
    let sendNotificationControl = this.customersForm.get('sendNotification');
    sendNotificationControl.valueChanges.subscribe(value =>{
      this.setNotification(value);
    })
  }
  save() {
    console.log(this.customersForm);
  }
  setNotification(notifyVal: string) {
    const phoneControl = this.customersForm.get('phone');
    if (notifyVal === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
  setMessage(c:AbstractControl): void{
    this.emailMessage = '';
    if((c.touched || c.dirty)&& c.errors){
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages[key]
      )
    }
  }
}

