import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpUser } from 'src/app/shared/dtos/SignUpUser';
import { User } from 'src/app/shared/models/User';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private contactService: ContactService, private router: Router) {
    if(contactService.getSignedUserId()) {
      router.navigateByUrl('/');
    }
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
    })
  }

  onSubmit(): void {
    const user: SignUpUser = new SignUpUser(this.signUpForm.value);
    this.contactService.registerUser(this.signUpForm.value).subscribe(
      (response: User) => {
        console.log(response);     
        this.contactService.updateSignedUser(response);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.error(error.status);        
        console.error(error.error);        
      }
    )
  }
}
