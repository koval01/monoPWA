import { MonoAPI } from "./mono";
import { currencyData } from "../store";

const currencyCode = {840: "Долар", 978: "Євро"};

interface Data {
    code: number
    a: number
    b: number
}
interface DataCurrency {
    currencyCodeA: number;
    currencyCodeB: number;
    rateBuy: number;
    rateSell: number;
    date: number;
}

export const currencyFormat = (d: Data) => Array.isArray(d.code) ? 
    d.code.map(
        code => currencyCode[code]
    ).join('/') : currencyCode[d.code];

const dataTransformer = (data: DataCurrency[]) => data.map(item => {
    const { currencyCodeA, currencyCodeB, rateBuy, rateSell } = item;
    return {
        code: 978 === currencyCodeA && 840 === currencyCodeB ? [currencyCodeA, currencyCodeB] : currencyCodeA,
        a: rateBuy,
        b: rateSell
    };
});

export const getData = async () => {
    const response = await MonoAPI.currencyInfo();
    let data = response.success ? response.data : void 0;

    if (!data || !data.length) return;
    currencyData.set({ currency: dataTransformer(data.slice(0, 3)), loading: false });
}
