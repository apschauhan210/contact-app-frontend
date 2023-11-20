import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/Contact';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formTypes, formValues } from '../../models/formTypes';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/User';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formType: string;
  form: FormGroup;
  contact?: Contact;
  showSpinner = false;

  constructor(
    private contactService: ContactService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      formType: formTypes,
      contact?: Contact
    }
  ) {

    this.formType = data.formType;
    this.contact = data.contact;

    if (this.formType === formValues.Register) {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.email
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]),
        company: new FormControl(''),
        position: new FormControl('')
      })
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.contact?.name, [
          Validators.required
        ]),
        email: new FormControl(this.contact?.email, [
          Validators.email
        ]),
        phone: new FormControl(this.contact?.phone, [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]),
        company: new FormControl(this.contact?.company),
        position: new FormControl(this.contact?.position)
      })
    }
  }

  onSubmit() {
    this.showSpinner = true;
    if (this.formType === formValues.Register) {
      const contact = new Contact(this.form.value);
      const userId = this.contactService.getSignedUserId();
      if (userId)
        this.contactService.addContact(userId, contact).subscribe(
          (response: User) => {
            this.showSpinner = false;
            this.onClose(true);
          },
          (error: HttpErrorResponse) => {
            this.showSpinner = false;
            console.error(error.error);
          }
        )
    } else if (this.formType === formValues.Edit) {
      this.form.value.contactId = this.contact?.contactId;
      this.contact = this.form.value;
      console.log(this.contact);
      if (this.contact) {
        const userId = this.contactService.getSignedUserId();
        if (userId)
          this.contactService.updateContact(userId, this.contact).subscribe(
            (response: User) => {
              console.log(response);
              this.showSpinner = false;
              this.onClose(true);
            },
            (error: HttpErrorResponse) => {
              this.showSpinner = false;
              console.error(error.error);
            }
          )
      }
    }
  }

  onClose(shouldClose: boolean): void {
    this.dialogRef.close(shouldClose);
  }
}
