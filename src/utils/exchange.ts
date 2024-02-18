import { CookieManager } from './cookies';
import { session } from '../store';
import { MonoAPI } from './mono'; 

interface Response {
    data?: any,
    error?: string,
    token?: string|boolean,

}

let waitExchangeCalled: boolean;

export const waitExchange = async (token: string) => {
    let sessionValue: string;
    session.subscribe((v) => sessionValue = v);
    
    if (!token || waitExchangeCalled || sessionValue) return;

    waitExchangeCalled = true;

    let response: Response;
    response = await MonoAPI.exchangeToken(token);
    response = response.data;

    waitExchangeCalled = false;

    if (response.error) return;
    if (!response.token) {
      await waitExchange(token); // repeat
    }

    if (typeof response.token === "string") {
      CookieManager.setCookie("session", response.token, 30);
      session.set(CookieManager.getCookie("session"));
    }
}
