import { writable } from 'svelte/store';

const rollIn = {
    token: null,
    loading: true
};
export const rollInData = writable(rollIn);

const currency = {
    currency: [],
    loading: true
}
export const currencyData = writable(currency);

export const session = writable(null);
