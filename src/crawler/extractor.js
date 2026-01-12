import * as cheerio from "cheerio";

export function extractContent(html) {
    const $ = cheerio.load(html);

    // extract title
    const title = $("title").text().trim();

    // extract headings
    const headings = [];
    $("h1, h2, h3").each((_, el) => {
        const text = $(el).text().trim();
        if (text) headings.push(text);
    });

    // extract paragraphs
    const paragraphs = [];
    $("p").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) {
            paragraphs.push(text);
        }
    });

    return {
        title,
        headings,
        paragraphs,
    };
}
