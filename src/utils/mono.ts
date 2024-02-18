import { fetchData } from "./api";
import { CookieManager } from "./cookies";

interface RequestOptions {
    domain?: string;
    token?: string;
    method?: string;
    payload?: Record<string, any>;
}

export class MonoAPI {
    static async makeRequest(endpoint: string, options: RequestOptions = {}): Promise<any> {
        try {
            const { token: authToken, ...fetchOptions } = options;
            const response = await fetchData(endpoint, { ...fetchOptions, token: authToken });
            return response;
        } catch (error) {
            console.error(`Error in ${endpoint}:`, error.message);
            throw error;
        }
    }

    static async checkProto(): Promise<void> {
        return this.makeRequest('check-proto');
    }

    static async rollIn(): Promise<void> {
        return this.makeRequest('roll-in');
    }

    static async exchangeToken(token: string): Promise<any> {
        return this.makeRequest('exchange-token', { method: "POST", payload: { token } });
    }

    static async clientInfo(): Promise<any> {
        const token = CookieManager.getCookie("session");
        if (token) {
            return this.makeRequest('request/personal/client-info', { token });
        } else {
            throw new Error('Session token is not available');
        }
    }

    static async currencyInfo(): Promise<any> {
        return this.makeRequest('bank/currency', { domain: "api.monobank.ua" });
    }
}
