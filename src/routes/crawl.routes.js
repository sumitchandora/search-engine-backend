import express from "express";
import { crawlQueue } from "../queue/crawlQueue.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    await crawlQueue.add("crawl-job", { url });

    return res.json({
        status: "queued",
        url,
    });
});

export default router;
