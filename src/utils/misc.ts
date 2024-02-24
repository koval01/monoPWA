import CyrillicToTranslit from "cyrillic-to-translit-js";
import { generateGreeting } from "./time";

export const clientNameFormat = (name: string): string => {
    if (!name) return "";
    name = name?.split(" ").pop() ?? 'Незнайомець';
    return generateGreeting(name);
}

export const translate = (input: string) =>
        CyrillicToTranslit({ preset: "uk" }).transform(input);
