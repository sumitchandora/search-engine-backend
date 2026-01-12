import { createClient } from "redis";
import 'dotenv/config'
const client = createClient({
    socket: {
        host: process.env.REDDIS_HOST || "127.0.0.1",
        port: process.env.REDDIS_PORT || 6379,
        reconnectStrategy: retries => {
            console.log(`Redis reconnect attempt: ${retries}`);
            return Math.min(retries * 100, 3000);
        }
    }
});

client.on("connect", () => {
    console.log("Redis connected");
});

client.on("error", err => {
    console.error("Redis error:", err.message);
});

async function connectRedis() {
    try {
        if (!client.isOpen) {
            await client.connect();
        }
    } catch (err) {
        console.error("Redis connection failed, continuing without cache");
    }
}

export { client as redis, connectRedis };
