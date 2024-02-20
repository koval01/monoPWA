import { MonoAPIExtended } from "./mono";
import { currencyData } from "../store";
import { cacheData, getCacheData } from "./cache";

const currencyCode = {840: "Долар", 978: "Євро"};

interface Data {
    code: number
    a: number
    b: number
}
interface CurrencyArray {
    currencyCodeA: number;
    currencyCodeB: number;
    rateBuy: number;
    rateSell: number;
    date: number;
}

export const currencyFormat = (d: Data): string => {
    const currencyName = (code: number) => currencyCode[code] || 'Невідома валюта';
    return Array.isArray(d.code) ? d.code.map(currencyName).join('/') : currencyName(d.code as number);
};

const dataTransformer = (data: Partial<CurrencyArray>[]) => data.map(item => {
    const { currencyCodeA, currencyCodeB, rateBuy, rateSell, date } = item;
    return {
        code: 978 === currencyCodeA && 840 === currencyCodeB ? [currencyCodeA, currencyCodeB] : currencyCodeA,
        a: rateBuy,
        b: rateSell,
        date: date
    };
});

export const getData = async (): Promise<void> => {
    const cacheCurrency = await getCacheData('currencyData', 60);
    if (cacheCurrency) {
        currencyData.set({ currency: cacheCurrency, loading: false });
        return;
    }

    // Якщо кешування не вдалося, робимо запит до сервера
    const response = await MonoAPIExtended.currencyInfo();
    let data = response.success ? response.data : [];

    if (!data.length) return;
    data = data.slice(0, 3);
    data = dataTransformer(data);

    // Записуємо результат запиту у кеш
    await cacheData('currencyData', data);

    currencyData.set({ currency: data, loading: false });
};
