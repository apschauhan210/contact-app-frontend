import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { Contact } from 'src/app/shared/models/Contact';
import { User } from 'src/app/shared/models/User';
import { formTypes, formValues } from 'src/app/shared/models/formTypes';
import { ContactService } from 'src/app/shared/services/contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  contacts: Contact[] = [];
  formValues = formValues;
  allContacts: Contact[] = [];

  signedUser?: User;

  dropdownOpen: boolean[] = [];

  constructor(private contactService: ContactService, public dialog: MatDialog, private router: Router) {
    if(!this.contactService.getSignedUserId()) {
      this.router.navigateByUrl('/');
    }
    this.signedUser = this.contactService.getSignedUser();
    this.updateContacts();
  }

  updateContacts(): void {
    const userId = this.contactService.getSignedUserId();
    if (userId)
      this.contactService.getContacts(userId).subscribe(
        (response: Contact[]) => {
          console.log(response);
          this.contacts = response.sort((c1, c2) => c1.name.localeCompare(c2.name));
          this.allContacts = Array.from(this.contacts);
          this.dropdownOpen = new Array(response.length);

          // this.downloadFile(response, 'contacts');
        },
        (error: HttpErrorResponse) => {
          console.error(error.error);
        }
      )
  }

  public openDialog(type: formTypes, contact?: Contact) {
    const dialogRef = this.dialog
      .open(FormComponent, {
        width: '480px',
        height: '97%',
        data: { formType: type, contact: contact }
      })
      .afterClosed().subscribe((shouldRefresh: boolean) => {
        if (shouldRefresh)
          this.updateContacts();
      });
  }

  deleteContact(contact: Contact) {
    if (confirm(`Are you sure you want to delete ${contact.name} from your contact list?`) && contact.contactId) {
      const userId = this.contactService.getSignedUserId();
      if (userId)
        this.contactService.deleteContact(userId, contact.contactId).subscribe(
          (response: User) => {
            console.log(response);
            this.updateContacts();
          },
          (error: HttpErrorResponse) => {
            console.error(error.error);
          }
        )
    }
  }

  toggleDropdown(index: number): void {
    this.dropdownOpen[index] = !this.dropdownOpen[index];
  }

  isOpen(index: number): boolean {
    return this.dropdownOpen[index];
  }

  searchContacts(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.length > 0) {
      this.contacts = this.allContacts.filter(contact => {
        const category = contact.categories?.find((category) => category.indexOf(query) >= 0);
        return contact.name.toLowerCase().indexOf(query) >= 0 || contact.email?.toLowerCase().indexOf(query) > 0 || contact.phone.toLowerCase().indexOf(query) > 0 || category;
      });
    } else {
      this.contacts = this.allContacts;
    }
  }

  downloadFile(data: any, fileName: string) {
    const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName+ '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
