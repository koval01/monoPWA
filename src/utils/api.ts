interface RequestOptions {
    domain?: string;
    token?: string;
    method?: string;
    payload?: Record<string, any>;
}

interface FetchResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export const fetchData = async (endpoint: string, options: RequestOptions = {}): Promise<FetchResponse> => {
    const { domain = import.meta.env.VITE_API_HOST, token: authToken, method = 'GET', payload } = options;

    if (!domain) throw new Error('Domain API is undefined');

    const headers: Record<string, string> = {};

    if (authToken) {
        headers['X-Request-Id'] = authToken;
    }

    try {
        const url = `https://${domain}/${endpoint}`;
        const fetchOptions: RequestInit = {
            method,
            headers,
        };

        if (method === 'POST' && payload) {
            const formData = new FormData();

            for (const key in payload) {
                if (Object.prototype.hasOwnProperty.call(payload, key)) {
                    formData.append(key, payload[key]);
                }
            }

            fetchOptions.body = formData;
        }

        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();

        if (!data) {
            throw new Error('Server response was not ok');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return { success: false, error: error.message };
    }
};
