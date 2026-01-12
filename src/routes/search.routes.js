import express from "express";
import { tokenize } from "../indexer/tokenizer.js";
import { searchIndex } from "../indexer/invertedIndex.js";
import Document from "../models/Document.js";
import { redis } from "../cache/redisClient.js";

function looksLikeUrl(query) {
    return (
      query.startsWith("http://") ||
      query.startsWith("https://") ||
      query.includes(".com") ||
      query.includes(".in") ||
      query.includes(".org")
    );
}
  
const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });

  const cacheKey = `search:${q}`;
  const cached = await redis.get(cacheKey);

   // CASE 1: URL search
   if (looksLikeUrl(q)) {
    const docs = await Document.find({
      url: { $regex: q, $options: "i" }
    });

    return res.json({
      type: "url-search",
      results: docs.map(doc => ({
        url: doc.url,
        title: doc.title,
        score: 100 // fixed high score
      }))
    });
  }

  // CASE 2: Normal keyword search

  if (cached) {
    return res.json({
      source: "cache",
      results: JSON.parse(cached),
    });
  }

  const tokens = tokenize(q);
  const rankedDocs = await searchIndex(tokens);

  // fetch document details
  const results = [];
  for (const item of rankedDocs) {
    const doc = await Document.findById(item.docId);
    if (!doc) continue;

    results.push({
      url: doc.url,
      title: doc.title,
      score: item.score,
    });
  }

  await redis.set(cacheKey, JSON.stringify(results), { EX: 60 });

  return res.json({
    source: "db",
    query: q,
    results,
  });
});

export default router;
