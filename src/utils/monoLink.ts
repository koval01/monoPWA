const iOS = (): boolean => {
    return /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
}

const openApp = (requestId: string): void => {
    if (iOS() && document.referrer.indexOf("apps.apple.com") > 0) return;

    const appUrl = `app://com.ftband.mono/auth/${requestId}`;
    window.location.href = appUrl;
};

export const triggerAppOpen = (requestId: string): void => {
    if (!requestId) return;
    openApp(requestId);
};
