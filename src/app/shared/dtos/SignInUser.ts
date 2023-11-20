export class SignInUser {
    email: string;
    password: string;

    constructor(user: {email: string, password: string}) {
        this.email = user.email;
        this.password = user.password;
    }
}