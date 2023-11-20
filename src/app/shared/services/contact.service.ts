import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/User';
import { SignUpUser } from '../dtos/SignUpUser';
import { SignInUser } from '../dtos/SignInUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiBaseUrl = environment.apiBaseUrl;

  public userId = "";
  public signedUser?: User;

  constructor(private http: HttpClient, private router: Router) { }

  public registerUser(user: SignUpUser): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/User`, user);
  }

  public signinUser(user: SignInUser): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/User/login`, user);
  }

  public getContacts(userId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiBaseUrl}/User/contacts/${userId}`);
  }

  public addContact(userId: string, contact: Contact): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/User/add-contact/${userId}`, contact);
  }

  public deleteContact(userId: string, contactId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiBaseUrl}/User/remove-contact/${userId}/${contactId}`);
  }

  public updateContact(userId: string, contact: Contact): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/User/update-contact/${userId}`, contact);
  }

  public getCategories(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/User/categories/${userId}`);
  }

  public getContactsFromCategory(userId: string, category: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiBaseUrl}/User/${userId}/${category}/all`);
  }

  public addCategory(userId: string, category: string): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/User/add-category/${userId}/${category}`, {});
  }

  public addContactToCategory(userId: string, category: string, contactId: string): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiBaseUrl}/User/add-to-category/${userId}?category=${category}&contactId=${contactId}`, {});
  }

  public addContactsToCategory(userId: string, category: string, contactIds: string[]): Observable<Object> {
    return this.http.put(`${this.apiBaseUrl}/User/add-multiple-to-category/${userId}?category=${category}`, contactIds);
  }



  public updateSignedUser(user: User) {
    this.signedUser = user;
    console.log(user);
    
    if (user.userId) {
      this.userId = user.userId;
      localStorage.setItem('userId', user.userId);
      console.log(this.userId);
      
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getSignedUser(): User | undefined {
    const localUser = localStorage.getItem('user');
    if(localUser) {
      const user = JSON.parse(localUser);
      return user as User;
    } else {
      return undefined;
    }
  }

  public getSignedUserId(): string | undefined | null {
    const localUser = localStorage.getItem('user');
    if(localUser) {
      const user = JSON.parse(localUser);
      return (user as User).userId;
    } else {
      return null;
    }
  }

  public logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/');
  }
}
