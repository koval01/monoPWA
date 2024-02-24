import { fetchData } from "./api";
import { exchangeState } from "../store";
import { cacheData, getCacheData } from "./cache";
import { CookieManager } from "./cookies";
import { translate } from "./misc";
import { getCardType } from "./card";

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
    currencySymbol?: string;
    cashbackType: string;
    balance: number;
    creditLimit: number;
    maskedPan: string[];
    type: string;
    iban: string;
    maskedPanFormatted?: string;
    maskedPanSystem?: string;
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
        let state: boolean;
        exchangeState.subscribe((v) => state = v);

        if (state) return;

        const resp = await this.makeRequest(
            'exchange-token', 
            { 
                method: "POST", 
                payload: { token } 
            }
        );

        if (resp?.data?.token) {
            await this.clientInfo(resp.data.token);
        }

        exchangeState.set(false);
        return resp;
    }

    static async clientInfo(setToken: string = ""): Promise<FetchResponse<ClientInfoResponse>> {
        const token = setToken ? setToken : CookieManager.getCookie("session");
        if (token) {
            const cacheClient = await getCacheData('cacheClient', 60);
            if (cacheClient) return cacheClient;
            
            const response = await this.makeRequest('request/personal/client-info', { token });
            if (response.error || !response.data) return { success: false };

            const rebuiltAccounts = [];
            response.data.accounts.forEach((account: AccountInfo) => {
                account.maskedPan.forEach((maskedPan: string) => {
                    rebuiltAccounts.push({
                        ...account,
                        maskedPan,
                    });
                });
            });
            response.data.accounts = rebuiltAccounts;

            response.data.latName = translate(response.data.name);
            response.data.accounts = response.data.accounts.map((account: AccountInfo) => ({
                ...account,
                currencySymbol: { 840: "$", 978: "€", 980: "₴" }[account.currencyCode],
                maskedPanFormatted: account.maskedPan.match(/.{1,4}/g)?.join(" "),
                maskedPanSystem: getCardType(account.maskedPan)
            }));

            await cacheData('cacheClient', response);

            // Зберігаємо у довгостроковий кеш ім'я власника акаунту
            const cacheClientName = await getCacheData('cacheClientName');
            const respClientName = response?.data?.name;
            if (cacheClientName !== respClientName) {
                await cacheData('cacheClientName', respClientName);
            }

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
