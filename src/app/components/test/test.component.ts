import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // public checks: Array<ChoiceClass> = [
  //   { description: 'descr1', value: 'value1' },
  //   { description: "descr2", value: 'value2' },
  //   { description: "descr3", value: 'value3' }
  // ];

  // initModelForm(): FormGroup {
  //   return this._fb.group({
  //     otherControls: [''],
  //     // The formArray, empty 
  //     myChoices: new FormArray([]),
  //   }
  // }

  // onCheckChange(event) {
  //   const formArray: FormArray = this.myForm.get('myChoices') as FormArray;

  //   /* Selected */
  //   if (event.target.checked) {
  //     // Add a new control in the arrayForm
  //     formArray.push(new FormControl(event.target.value));
  //   }
  //   /* unselected */
  //   else {
  //     // find the unselected element
  //     let i: number = 0;

  //     formArray.controls.forEach((ctrl: FormControl) => {
  //       if (ctrl.value == event.target.value) {
  //         // Remove the unselected element from the arrayForm
  //         formArray.removeAt(i);
  //         return;
  //       }

  //       i++;
  //     });
  //   }
  // }
}
