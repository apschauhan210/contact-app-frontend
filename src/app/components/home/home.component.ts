import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  signedUser?: User;

  constructor(private contactService: ContactService) {
    this.signedUser = contactService.getSignedUser();
  }
}
