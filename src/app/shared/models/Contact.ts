export class Contact {
    contactId?: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    categories?: string[];

    public constructor(contact: {name: string, email: string, phone: string, company: string, position: string}) {
        this.name = contact.name;
        this.email = contact.email;
        this.phone = contact.phone;
        this.company = contact.company;
        this.position = contact.position;
    }
}