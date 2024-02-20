export const getCardType = (number: string): string => {
    if (!number) return "";

    number = number.replaceAll("*", "0");
    let re: RegExp = /^4/;
    
    if (number.match(re) !== null)
        return "visa";

    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "mastercard";

    re = /^(4026|417500|4508|4844|491(3|7))/;
    if (number.match(re) !== null)
        return "visa";

    return "";
}
