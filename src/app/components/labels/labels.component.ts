import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddLabelComponent } from 'src/app/shared/components/add-label/add-label.component';
import { ContactListComponent } from 'src/app/shared/components/contact-list/contact-list.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { Contact } from 'src/app/shared/models/Contact';
import { User } from 'src/app/shared/models/User';
import { formTypes, formValues } from 'src/app/shared/models/formTypes';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent {
  labels: string[] = [];

  labelControl = new FormControl('');
  selectedLabel: string | undefined;
  contacts: Contact[] = [];
  formValues = formValues;

  showSpinner = false;

  constructor(private contactService: ContactService, public dialog: MatDialog, private router: Router) {
    if(!this.contactService.getSignedUserId()) {
      this.router.navigateByUrl('/');
    }
    this.updateLabels();
  }

  updateLabels(): void {
    const userId = this.contactService.getSignedUserId();
    if (userId)
      this.contactService.getCategories(userId).subscribe(
        (response: string[]) => {
          this.labels = response;
        },
        (error: HttpErrorResponse) => {
          console.error(error.error);
        }
      )
  }

  updateList(): void {
    if (this.labelControl.value) {
      this.showSpinner = true;
      this.selectedLabel = this.labelControl.value.charAt(0).toUpperCase() + this.labelControl.value.slice(1);
      const userId = this.contactService.getSignedUserId();
      if (userId)
        this.contactService.getContactsFromCategory(userId, this.labelControl.value).subscribe(
          (response: Contact[]) => {
            this.contacts = response.sort((c1, c2) => c1.name.localeCompare(c2.name));
            this.showSpinner = false;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.showSpinner = false;
          }
        );
    }
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
          this.updateList();
      });
  }

  deleteContact(contact: Contact) {
    if (confirm(`Are you sure you want to delete ${contact.name} from your contact list?`) && contact.contactId) {
      const userId = this.contactService.getSignedUserId();
      if (userId)
        this.contactService.deleteContact(userId, contact.contactId).subscribe(
          (response: User) => {
            console.log(response);
            this.updateList();
          },
          (error: HttpErrorResponse) => {
            console.error(error.error);
          }
        )
    }
  }

  openAddLabel(): void {
    const dialogRef = this.dialog
      .open(AddLabelComponent, {
        width: '480px',
        height: '30%'
      })
      .afterClosed().subscribe((added: boolean) => {
        if (added)
          this.updateLabels();
      })
  }

  openContactList(): void {
    const userId = this.contactService.getSignedUserId();
    if (userId)
      this.contactService.getContacts(userId).subscribe(
        (response: Contact[]) => {
          const allContacts = response;
          const filteredContacts: Contact[] = [];
          allContacts.forEach(contact => {
            var found = false;
            for (let labelContact of this.contacts) {
              if (labelContact.contactId === contact.contactId) {
                found = true;
                break;
              }
            }
            if (!found) {
              filteredContacts.push(contact);
            }
          });
          const dialogRef = this.dialog
            .open(ContactListComponent, {
              width: '480px',
              height: '90%',
              data: { label: this.selectedLabel, contacts: filteredContacts }
            })
            .afterClosed().subscribe((shouldRefresh: boolean) => {
              if (shouldRefresh)
                this.updateList();
            });
        }
      )
    // const dialogRef = this.dialog
    //   .open(ContactListComponent, {
    //     width: '480px',
    //     height: '97%',
    //     data: { contacts: }
    //   })
    //   .afterClosed().subscribe((shouldRefresh: boolean) => {
    //     if (shouldRefresh)
    //       this.updateList();
    //   });
  }
}
