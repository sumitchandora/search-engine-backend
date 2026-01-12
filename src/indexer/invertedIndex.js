import Index from "../models/Index.js"; // Storing indexes in DB

export async function addToIndex(docId, tokens) {
    console.log("log the tokens", tokens)
    for (const word of tokens) {
        const entry = await Index.findOne({ word });

        if (!entry) {
            await Index.create({
                word,
                postings: { [docId]: 1 },
            });
        } else {
            const count = entry.postings.get(String(docId)) || 0;
            entry.postings.set(String(docId), count + 1);
            await entry.save();
        }
    }
};

export async function searchIndex(queryTokens) {
    const scores = {};

    for (const token of queryTokens) {
      const entry = await Index.findOne({ word: token });
      if (!entry) continue;
  
      for (const [docId, freq] of entry.postings.entries()) {
        if (!scores[docId]) scores[docId] = 0;
        scores[docId] += freq;
      }
    }

    // convert to sorted array
    return Object.entries(scores)
      .map(([docId, score]) => ({
        docId: docId,
        score
    }))
    .sort((a, b) => b.score - a.score);
}