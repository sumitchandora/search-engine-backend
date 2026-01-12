import { Queue } from "bullmq";

export const crawlQueue = new Queue("crawl-queue", {
    connection: { host: "127.0.0.1", port: 6379 },
});
