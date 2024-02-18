export const fetchData = async (endpoint, options = {}) => {
    const { domain = import.meta.env.VITE_API_HOST, token } = options;

    if (!domain) throw new Error('Domain API is undefined');

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['X-Request-Id'] = token;
    }

    try {
        const res = await fetch(`https://${domain}/${endpoint}`, {
            headers,
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
 
        let data = await res.json();

        if (!data) {
            throw new Error('Server response was not ok');
        }

        return { success: true, data: data };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return { success: false, error: error.message };
    }
};
