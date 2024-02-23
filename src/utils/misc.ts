import { generateGreeting } from "./time";

export const clientNameFormat = (name: string): string => {
    if (!name) return "";
    name = name?.split(" ").pop() ?? 'Незнайомець';
    return generateGreeting(name);
}
