import { writable } from 'svelte/store';

const rollIn = {
    token: null,
    loading: true
};
export const rollInData = writable(rollIn);
