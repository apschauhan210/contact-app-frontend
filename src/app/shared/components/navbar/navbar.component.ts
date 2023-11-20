import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOpen = false;
  signedUser?: User;

  constructor(private contactService: ContactService) {
    this.signedUser = this.contactService.getSignedUser();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  logOut(): void {
    this.signedUser = undefined;
    this.isOpen = false;
    this.contactService.logOut();
  }
}
