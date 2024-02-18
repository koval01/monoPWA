import { fetchData } from "./api";

export class MonoAPI {
    static async checkProto() {
        try {
            const response = await fetchData('check-proto');
            return response;
        } catch (error) {
            console.error('Error checking protocol:', error.message);
            throw error;
        }
    }

    static async rollIn() {
        try {
            const response = await fetchData('roll-in');
            return response;
        } catch (error) {
            console.error('Error initiating roll-in process:', error.message);
            throw error;
        }
    }

    static async exchangeToken(token) {
        try {
            const response = await fetchData('exchange-token', { token });
            return response;
        } catch (error) {
            console.error('Error exchanging token:', error.message);
            throw error;
        }
    }

    static async clientInfo() {
        try {
            const response = await fetchData('request/personal/client-info', { token: localStorage.getItem("token") });
            return response;
        } catch (error) {
            console.error('Error retrieving client information:', error.message);
            throw error;
        }
    }
}
