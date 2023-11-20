import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInUser } from 'src/app/shared/dtos/SignInUser';
import { SignUpUser } from 'src/app/shared/dtos/SignUpUser';
import { User } from 'src/app/shared/models/User';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private contactService: ContactService, private router: Router) {
    if(contactService.getSignedUserId()) {
      router.navigateByUrl('/');
    }
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(): void {
    const user: SignInUser = new SignInUser(this.signinForm.value);
    this.contactService.signinUser(this.signinForm.value).subscribe(
      (response: User) => {
        console.log(response);     
        this.contactService.updateSignedUser(response);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {   
        console.error(error.error);        
      }
    )
  }
}
