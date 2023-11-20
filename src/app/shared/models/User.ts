import { Contact } from "./Contact";

export class User {
    userId?: string;
    email: string;
    name: string;
    phone: string;
    contacts: Contact[];

    public constructor(email: string, name: string, phone: string, contacts: Contact[]) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.contacts = contacts;
    }
}