export const fetchData = async (endpoint, options = {}) => {
    const { domain = import.meta.env.API_HOST } = options;

    if (!domain) throw new Error('Domain API is undefined');

    try {
        const res = await fetch(`https://${domain}/${endpoint}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
 
        let data = await res.json();
        if (!data) {
            throw new Error('Server response was not ok');
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
