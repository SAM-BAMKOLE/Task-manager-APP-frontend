import { SignupBody } from "../types/requestTypes";
import { SigninData } from "../types/responseTypes";

// const API_URI = process.env.API_URI;
const API_URI = import.meta.env.VIRE_API_URL || "http://localhost:3000/";

export async function signupHandle(formBody: SignupBody) {
    try {
        const response = await fetch(API_URI + "auth/signup", {
            body: JSON.stringify(formBody),
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: { status: string; message: string } = await response.json();

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { status: "failed", message: e!.message };
        // console.error(e!.message!);
    }
}
export async function signinHandle(formBody: { email: string; password: string }) {
    try {
        const response = await fetch(API_URI + "auth/signin", {
            body: JSON.stringify(formBody),
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data: SigninData = await response.json();

        if (data.status == "success") {
            localStorage.setItem("task-manager-token", JSON.stringify(data.data.accessToken));
            localStorage.setItem("task-manager-userId", JSON.stringify(data.data.user._id));
        }

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error(e!.message!);
        return { message: "Unable to send request", status: "error" };
    }
}

export async function logoutHandle() {
    try {
        const token = localStorage.getItem("task-manager-token")
            ? JSON.parse(localStorage.getItem("task-manager-token")!)
            : "";
        const response = await fetch(API_URI + "auth/logout", {
            method: "post",
            headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("task-manager-token");
        localStorage.removeItem("task-manager-userId");
        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error(e!.message!);
    }
}
