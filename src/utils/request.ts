import { GetUser } from "../types/responseTypes";
/*
export async function getUser(userId: string, token: string): Promise<GetUser > {
    try {
        const response = await fetch(import.meta.env.VITE_API_URI + `user/details/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data: GetUser = await response.json();

        return data;
    } catch (e) {
        return { status: "Error", message: "Network not okay" };
    }
}
*/
export async function getUser(userId: string, token: string): Promise<GetUser> {
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchRequest(`user/details/${userId}`, options);
    return response;
}

export async function fetchRequest(uri: string, options: object) {
    try {
        let response;
        response = await fetch(import.meta.env.VITE_API_URI + uri, {
            ...options,
            credentials: "include",
        });

        if (response.status == 401) {
            const refreshRes = await fetch(import.meta.env.VITE_API_URI + "auth/refresh", {
                method: "POST",
                credentials: "include",
            });
            const tokenRefreshSuccess = await refreshRes.json();

            if (refreshRes.ok) {
                localStorage.setItem(
                    "task-manager-token",
                    JSON.stringify(tokenRefreshSuccess.data.accessToken)
                );

                console.log(tokenRefreshSuccess);
                // console.log({
                //     ...options,
                //     headers: { Authorization: tokenRefreshSuccess.data.accessToken },
                // });
                response = await fetch(import.meta.env.VITE_API_URI + uri, {
                    ...options,
                    headers: { Authorization: `Bearer ${tokenRefreshSuccess.data.accessToken}` },
                    credentials: "include",
                });
                // return fetchRequest(uri, {
                //     ...options,
                //     headers: { Authorization: tokenRefreshSuccess.data.accessToken },
                // });
            } else {
                throw new Error(tokenRefreshSuccess.message);
            }
        }

        const data = await response.json();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error(e!.message!);
        return { message: "Unable to send request", status: "error" };
    }
}
