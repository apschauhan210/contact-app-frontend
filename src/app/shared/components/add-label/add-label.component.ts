import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent {
  labelControl = new FormControl('', [Validators.required]);
  showSpinner = false;

  constructor(private contactService: ContactService, public dialogRef: MatDialogRef<AddLabelComponent>) {
  }

  addLabel() {
    if (this.labelControl.value) {
      const userId = this.contactService.getSignedUserId();
      if (userId) {
        this.showSpinner = true;
        this.contactService.addCategory(userId, this.labelControl.value).subscribe(
          (response: User) => {
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
  }

  onClose(shouldClose: boolean): void {
    this.dialogRef.close(shouldClose);
  }
}
