import express from "express";
import crawlRoutes from "./routes/crawl.routes.js";
import searchRoutes from "./routes/search.routes.js";
import { connectRedis } from "./cache/redisClient.js";
import { connectDB } from '../src/config/db.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectRedis();

app.use("/crawl", crawlRoutes);
app.use("/search", searchRoutes);

app.listen(3000, () => {
    connectDB();
    console.log("Server started on port 3000");
});
