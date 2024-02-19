const getNoun = (value: number, one = "секунду", two = "секунди", five = "секунд") => {
    let n = Math.abs(value);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

export const formatTimeAgo = (unixTime: number, adjustTimezone = true, ago = false): string => {
    const userTimeZoneOffset = adjustTimezone ? new Date().getTimezoneOffset() * 60 : 0;
    const userTime = new Date((unixTime + userTimeZoneOffset) * 1000);
    const currentTime = new Date();
    const differenceInSeconds = Math.floor((currentTime.getTime() - userTime.getTime()) / 1000);

    const seconds = differenceInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Функція для форматування числа до двоцифрового числа
    const padZero = (num: number) => (num < 10 ? "0" : "") + num;

    // Функція для форматування дати
    const formatDate = (date: Date) => {
        return `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()}, ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
    };

    // Функція для визначення "Сьогодні", "Вчора" або іншої дати
    const formatDay = (date: Date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === today.toDateString()) {
            return "Сьогодні";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Вчора";
        } else {
            return `${padZero(date.getDate())} ${months[date.getMonth()]}`;
        }
    };

    const months = [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];

    if (ago) {
        if (days > 0) {
            return getNoun(days, "день", "дні", "днів");
        } else if (hours > 0) {
            return getNoun(hours, "годину", "години", "годин");
        } else if (minutes > 0) {
            return getNoun(minutes, "хвилину", "хвилини", "хвилин");
        } else {
            return getNoun(seconds);
        }
    } else {
        if (days === 0) {
            return `${formatDay(userTime)}, ${padZero(userTime.getHours())}:${padZero(userTime.getMinutes())}`;
        } else {
            return `${formatDay(userTime)}, ${formatDate(userTime)}`;
        }
    }
};
