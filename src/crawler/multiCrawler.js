import { fetchPage } from "./crawler.js";
import { extractContent } from "./extractor.js";
import { extractInternalLinks } from "./linkExtractor.js";
import { tokenize } from "../indexer/tokenizer.js";
import { addToIndex } from "../indexer/invertedIndex.js";
import Document from "../models/Document.js";

export async function crawlSite(startUrl, maxPages = 5) {
  const visited = new Set();
  const queue = [startUrl];

  while (queue.length > 0 && visited.size < maxPages) {
    const url = queue.shift();
    if (visited.has(url)) continue;

    visited.add(url);

    try {
      const html = await fetchPage(url);
      const content = extractContent(html);

      // save page as document
      const doc = await Document.findOneAndUpdate(
        { url },
        { url, title: content.title },
        { upsert: true, new: true }
      );

      const text = [
        content.title,
        ...content.headings,
        ...content.paragraphs,
      ].join(" ");

      const tokens = tokenize(text);
      await addToIndex(doc._id.toString(), tokens);

      // extract new internal links
      const links = extractInternalLinks(html, url);

      for (const link of links) {
        if (!visited.has(link)) {
          queue.push(link);
        }
      }

    } catch (err) {
      console.error("Failed to crawl:", url);
    }
  }
  console.log(visited);
  return {
    crawledPages: visited.size,
    pages: Array.from(visited),
  };
}
