declare interface UserRegisterForm {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

declare interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
        };
    };
}