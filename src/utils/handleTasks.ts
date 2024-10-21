// import { GetTasks } from "../types/responseTypes";
import { fetchRequest } from "./request";

interface Task {
    title: string;
    description: string;
    datetime: string;
}
/*
export async function addTask(form: Task, token: string) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URI + "task/create", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        return { ...data, statusCode: response.status };
    } catch (e) {
        return { status: "error", message: "Unable to send request" };
    }
}

export async function getTask(id: string) {
    try {
        const token = localStorage.getItem("task-manager-token")
            ? JSON.parse(localStorage.getItem("task-manager-token")!)
            : "";
        const response = await fetch(import.meta.env.VITE_API_URI + `task/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data: GetTasks = await response.json();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e.message);
        return { status: "error", message: "Unable to send request" };
    }
}

export async function getTasks() {
    try {
        const token = localStorage.getItem("task-manager-token")
            ? JSON.parse(localStorage.getItem("task-manager-token")!)
            : "";
        const response = await fetch(import.meta.env.VITE_API_URI + "task/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data: GetTasks[] = await response.json();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e.message);
        return;
    }
}
*/

export async function addTask(form: Task, token: string) {
    const options = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(form),
    };
    const response = await fetchRequest(`task/create`, options);
    return response;
}

export async function getTask(id: string) {
    const token = localStorage.getItem("task-manager-token")
        ? JSON.parse(localStorage.getItem("task-manager-token")!)
        : "";
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchRequest(`task/${id}`, options);
    return response;
}

export async function getTasks() {
    const token = localStorage.getItem("task-manager-token")
        ? JSON.parse(localStorage.getItem("task-manager-token")!)
        : "";
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchRequest(`task/`, options);
    return response;
}
