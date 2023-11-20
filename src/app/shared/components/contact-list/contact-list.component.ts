import { Component, Inject } from '@angular/core';
import { Contact } from '../../models/Contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formTypes } from '../../models/formTypes';
import { ContactService } from '../../services/contact.service';
import { FormComponent } from '../form/form.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts: Contact[] = [];
  // formArray = new FormArray([]);
  contactIds: string[] = [];
  label: string;
  showSpinner = false;

  constructor(
    private contactService: ContactService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      label: string,
      contacts: Contact[]
    }
  ) {
    this.label = data.label;
    this.contacts = data.contacts;
  }

  onCheckChange(event: any) {
    if (event.target.checked) {
      this.contactIds.push(event.target.value);
    } else {
      this.contactIds = this.contactIds.filter(contactId => contactId != event.target.value);
    }

    console.log(this.contactIds);

  }

  onSubmit(): void {
    const userId = this.contactService.getSignedUserId();
    if (userId) {
      this.showSpinner = true;
      this.contactService.addContactsToCategory(userId, this.label, this.contactIds).subscribe(
        (response: any) => {
          this.showSpinner = false;
          this.onClose(true);
        },
        (error: HttpErrorResponse) => {
          this.showSpinner = false;
          console.error(error.error);
        }
      );
    }
  }

  onClose(shouldClose: boolean): void {
    this.dialogRef.close(shouldClose);
  }
}
