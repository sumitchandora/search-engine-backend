Folder Structure

Search-Engine-Backend/
│
├── src/
│   ├── crawler/
│   │   ├── crawler.js
│   │   └── extractor.js
│   │
│   ├── indexer/
│   │   ├── tokenizer.js
│   │   ├── invertedIndex.js
│   │   └── ranker.js
│   │
│   ├── search/
│   │   └── searchService.js
│   │`
│   ├── queue/
│   │   └── crawlQueue.js
│   │
│   ├── cache/
│   │   └── redisClient.js
│   │
│   ├── routes/
│   │   ├── crawl.routes.js
│   │   └── search.routes.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   └── app.js
│
├── docker-compose.yml
├── README.md
└── package.json


Crawling FLow: 
    POST /crawl
       ↓
    BullMQ Job
       ↓
    Crawler + Extractor
       ↓
    MongoDB (documents + index)


Searching Flow:
    GET /search
       ↓
    Redis Cache (if hit → return)
       ↓
    MongoDB Index (if miss)


1️⃣ API Server        → node src/app.js
2️⃣ Worker Service    → node src/queue/crawlWorker.js
3️⃣ Infrastructure    → Redis + MongoDB
