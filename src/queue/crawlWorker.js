import mongoose from "mongoose";
import { Worker } from "bullmq";
import { crawlSite } from "../crawler/multiCrawler.js";
import 'dotenv/config'

async function startWorker() {
  try {
        console.log("Connecting worker to MongoDB...");
        const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/search_engine";
        await mongoose.connect(MONGO_URI);

        console.log("Worker connected to MongoDB");

        new Worker(
          "crawl-queue",
          async job => {
            const { url } = job.data;
        
            console.log("Crawling site:", url);
        
            const result = await crawlSite(url, 5); // max 5 pages
        
            console.log("Crawl completed:", result);
          },
          {
            connection: { host: "127.0.0.1", port: 6379 },
        });

    } 
    catch (err) {
      console.error("Worker startup failed:", err);
      process.exit(1);
    }
}

startWorker();
