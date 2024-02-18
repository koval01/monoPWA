export const fetchData = async (endpoint, options = {}) => {
    const { domain = import.meta.env.VITE_API_HOST, token: authToken, method = 'GET', payload } = options;

    if (!domain) throw new Error('Domain API is undefined');

    const headers = {};

    if (authToken) {
        headers['X-Request-Id'] = authToken;
    }

    try {
        const url = `https://${domain}/${endpoint}`;
        const fetchOptions = {
            method,
            headers,
        };

        if (method === 'POST' && payload) {
            const formData = new FormData();

            // Додати дані у форматі FormData
            for (const key in payload) {
                formData.append(key, payload[key]);
            }

            fetchOptions.body = formData;
        }

        // @ts-ignore
        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
 
        let data = await res.json();

        if (!data) {
            throw new Error('Server response was not ok');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return { success: false, error: error.message };
    }
};
