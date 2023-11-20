import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TestComponent } from './components/test/test.component';
import { LabelsComponent } from './components/labels/labels.component';
import { ContactListComponent } from './shared/components/contact-list/contact-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'labels',
        component: LabelsComponent
      },
      {
        path: '',
        component: HomeComponent,
      },
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
