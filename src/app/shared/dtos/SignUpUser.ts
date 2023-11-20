export class SignUpUser {
    email: string;
    password: string;
    name: string;
    phone: string;

    constructor(user: {email: string, password: string, name: string, phone: string}) {
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.phone = user.phone;
    }
}