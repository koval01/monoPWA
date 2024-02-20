export const cacheData = async (key: string, data: any) => {
    if (!data) return;
    const dataToCache = {
        data: data,
        loading: false,
        timestamp: new Date().getTime()
    };
    const cache = await caches.open(key);
    cache.put(key, new Response(JSON.stringify(dataToCache)));
};

export const getCacheData = async (key: string, seconds: number) => {
    const cachedResponse = await caches.match(key);
    if (!cachedResponse) return;

    const cachedData = await cachedResponse.json();
    const currentTime = new Date().getTime();

    if (cachedData && cachedData.timestamp && (currentTime - cachedData.timestamp) < seconds * 1e3) {
        return cachedData.data;
    }
}
