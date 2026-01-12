import { stopwords } from "./stopwords.js";

export function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopwords.has(word));
}
