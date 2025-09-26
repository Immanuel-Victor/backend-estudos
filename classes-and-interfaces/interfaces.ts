interface Authenticatable {
    email: string;
    password: string;

    login(): void;
    logout(): void;
}

// Interface extension
// interface Authenticatable {
//     mfa: boolean;
// }

interface AuthenticatableAdmin extends Authenticatable {
    role: 'admin' | 'superadmin'
}
 
class AuthenticatableUser implements Authenticatable {
    constructor(
        public userName:string,
        public email:string,
        public password:string,
    ) {}

    login(): void {}

    logout(): void {
        
    }
}

function authenticate(user: Authenticatable) {
    return;
}