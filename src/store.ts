import { writable } from 'svelte/store';

interface RollInData {
    token: string | null;
    loading: boolean;
}

const rollIn: RollInData = {
    token: null,
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
