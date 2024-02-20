import { fetchData } from "./api";
import { cacheData, getCacheData } from "./cache";
import { CookieManager } from "./cookies";

interface RequestOptions {
    domain?: string;
    token?: string;
    method?: string;
    payload?: Record<string, any>;
}

export interface FetchResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

interface RollInResponse {
    token: string;
    requestId: string;
    url: string;
    qr: string;
}

interface CheckProtoResponse {
    proto: {
        version: number;
        patch: number;
    };
    implementation: {
        name: string;
        author: string;
        homepage: string;
    };
    server: {
        push: {
            api: string;
            cert: string;
            name: string;
        };
    };
}

interface TokenExchangeResponse {
    token: string | boolean;
}

interface AccountInfo {
    id: string;
    sendId: string;
    currencyCode: number;
    cashbackType: string;
    balance: number;
    creditLimit: number;
    maskedPan: string[];
    type: string;
    iban: string;
}

export interface ClientInfoResponse {
    clientId: string;
    name: string;
    webHookUrl: string;
    permissions: string;
    accounts: AccountInfo[];
}

interface CurrencyInfo {
    currencyCodeA?: number;
    currencyCodeB?: number;
    date: number;
    rateBuy?: number;
    rateSell?: number;
    rateCross?: number;
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

    static async checkProto(): Promise<FetchResponse<CheckProtoResponse>> {
        return this.makeRequest('check-proto');
    }

    static async rollIn(): Promise<FetchResponse<RollInResponse>> {
        return this.makeRequest('roll-in');
    }

    static async exchangeToken(token: string): Promise<FetchResponse<TokenExchangeResponse>> {
        return this.makeRequest('exchange-token', { method: "POST", payload: { token } });
    }

    static async clientInfo(): Promise<FetchResponse<ClientInfoResponse>> {
        const token = CookieManager.getCookie("session");
        if (token) {
            const cacheClient = await getCacheData('cacheClient', 10);
            if (cacheClient) return cacheClient;
            
            const response = await this.makeRequest('request/personal/client-info', { token });
            if (response.error || !response.data) return { success: false };
            await cacheData('cacheClient', response);

            return response;
        } else {
            throw new Error('Session token is not available');
        }
    }
}

export class MonoAPIExtended extends MonoAPI {
    static async currencyInfo(): Promise<FetchResponse<CurrencyInfo[]>> {
        return await this.makeRequest('bank/currency', { domain: "api.monobank.ua" });
    }
}
