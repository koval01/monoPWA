import { MonoAPIExtended } from "./mono";
import { currencyData } from "../store";

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
    // Перевіряємо, чи є дані в кеші
    const cachedResponse = await caches.match('currencyData');
    if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        // Перевіряємо, чи дані є валідні
        const currentTime = new Date().getTime();
        if (cachedData && cachedData.timestamp && (currentTime - cachedData.timestamp) < 60000) {
            currencyData.set({ currency: cachedData.currency, loading: false });
            return;
        }
    }

    // Якщо кешування не вдалося, робимо запит до сервера
    const response = await MonoAPIExtended.currencyInfo();
    let data = response.success ? response.data : [];

    if (!data.length) return;
    data = data.slice(0, 3);

    // Записуємо результат запиту у кеш
    const dataToCache = { currency: dataTransformer(data), loading: false, timestamp: new Date().getTime() };
    caches.open('currencyData').then(cache => {
        cache.put('currencyData', new Response(JSON.stringify(dataToCache)));
    });

    currencyData.set(dataToCache);
};
