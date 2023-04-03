import { userEndpoint } from "./endpoints";
import { request } from "./request";

export const createAuthToken = async (email: string) => {
    const r = {
        url: userEndpoint + '/auth',
        method: "GET",
        data: {
            username: email
        },
        headers: { "Content-Type": "application/json" },
    }
    const response = await request(r);
    return response;
}