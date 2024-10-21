import { TaskType } from "./taskTypes";

export interface SigninData {
    status: string;
    message: string;
    data: UserData;
}

export interface UserData {
    roles: {
        user: number;
        admin?: number;
        editor?: number;
    };
    accessToken: string;
    user: User;
}

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface GetTasks {
    status: string;
    data: TaskType[];
}

export interface FetchResponse {
    status: string;
    message: string;
    data?: Array<TaskType>;
}

export interface GetUser {
    status: string;
    data: {
        roles: {
            user: number;
            admin?: number;
            editor?: number;
        };
        _id: string;
        firstname: string;
        lastname: string;
        email: string;
        tasks: TaskType[];
        createdAt: string;
        updatedAt: string;
        __v: string;
    };
}
