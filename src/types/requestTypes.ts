export interface SignupBody {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Task {
    title: string;
    description: string;
    datetime: string;
}
