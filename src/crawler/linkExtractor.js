import * as cheerio from "cheerio";
import { URL } from "url";

export function extractInternalLinks(html, baseUrl) {
    const $ = cheerio.load(html);
    const base = new URL(baseUrl);  
    const links = new Set();
    $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (!href) return;    
        try {
            const fullUrl = new URL(href, base);    
            // only same domain
            if (fullUrl.origin === base.origin) {
              // remove hash & trailing slash
              fullUrl.hash = "";
              links.add(fullUrl.toString().replace(/\/$/, ""));
            }
        } catch {
          // ignore invalid URLs
        }
    });
    return Array.from(links);
}
