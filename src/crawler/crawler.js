import axios from "axios";

export async function fetchPage(url) {
    try {
        const response = await axios.get(url, {
            timeout: 20000,
            headers: {
                "User-Agent": "DistributedSearchBot/1.0",
            },
        });

        return response.data; // raw HTML
    } catch (error) {
        throw new Error("Failed to fetch page");
    }
}
