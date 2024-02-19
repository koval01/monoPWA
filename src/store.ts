import { writable } from 'svelte/store';

interface RollInData {
    token: string | null;
    url: string | null;
    qr: string | null;
    loading: boolean;
}

const rollIn: RollInData = {
    token: null,
    url: null,
    qr: null,
    loading: true
};
export const rollInData = writable(rollIn);

interface CurrencyData {
    currency: any[];
    loading: boolean;
}

const currency: CurrencyData = {
    currency: [],
    loading: true
}
export const currencyData = writable(currency);

export const session = writable<string | null>(null);
