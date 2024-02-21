import { CookieManager } from './cookies';
import { session, rollInData, rollIn } from '../store';
import { MonoAPI } from './mono'; 

interface Response {
    data?: any,
    error?: string,
    token?: string|boolean,

}

let waitExchangeCalled: boolean;

const waitExchange = async (token: string): Promise<boolean|void> => {
    let sessionValue: string|null = "";
    session.subscribe((v) => sessionValue = v);
    
    if (!token || waitExchangeCalled || sessionValue) return;

    waitExchangeCalled = true;

    let response: Response;
    response = await MonoAPI.exchangeToken(token);
    response = response?.data;

    waitExchangeCalled = false;

    if (!response) return false;
    if (response.error) return false;
    if (!response.token) {
      return await waitExchange(token); // repeat
    }

    if (typeof response.token === "string") {
      CookieManager.setCookie("session", response.token, 30);
      session.set(CookieManager.getCookie("session"));
    }

    return true;
}

export const exchangeProcess = async (token: string) => {
  const exchange = await waitExchange(token);
  if (exchange === false) {
    rollInData.set(rollIn);
    console.log("Reset preauth token");
  }
}
