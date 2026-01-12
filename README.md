<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>

  <h1> Distributed Search Engine Backend </h1>

  <p>
    A distributed backend system that crawls websites, indexes multi-page content,
    and serves fast, ranked search results using a custom-built inverted index.
    The project is designed to mirror how real-world search engines work internally,
    focusing on scalability, asynchronous processing, and clean system architecture.
  </p>

  <h2> Why This Project?</h2>
<p>
  This project was built to understand how search engines work at a
  <span class="highlight">fundamental level</span> rather than relying on
  ready-made tools or abstractions.
</p>
<p>
  Instead of using external search platforms, the core components of a search engine
  were implemented from scratch—web crawling, document indexing, inverted index
  construction, and relevance-based ranking. The goal was to explore how raw web data
  is transformed into searchable information and how queries are efficiently matched
  against large sets of documents.
</p>
<p>
  By designing the system with background workers, queues, and custom indexing logic,
  this project provides hands-on experience with the internal mechanics that power
  real-world search engines, focusing on scalability, correctness, and system design
  rather than UI or frameworks.
</p>


  <h2> Key Features</h2>
  <ul>
    <li>Asynchronous website crawling using background workers</li>
    <li>Multi-page crawling with internal link discovery</li>
    <li>Custom inverted index for efficient keyword-based search</li>
    <li>Frequency-based relevance ranking</li>
    <li>Fast search responses with Redis caching</li>
    <li>Clear separation of concerns between API, worker, crawler, and indexer</li>
  </ul>
  
<h2> Search Engine Architecture (Conceptual)</h2>


<img 
  src="https://media.geeksforgeeks.org/wp-content/uploads/20231009135700/Architecture-of-Search-Engine-copy.webp"
  alt="Search Engine Architecture Diagram"
  style="max-width: 100%; height: auto; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;"
/>
<h3>In this project:</h3>
<p>Client -> Express API -> Redis Queue (BullMQ) -> Background Worker Crawler -> Indexer -> MongoDB</p>

    

  <h2> Technologies Used (and Why)</h2>

  <h3>Node.js</h3>
  <p>
    Used for its non-blocking I/O model, making it suitable for handling concurrent
    crawl and search requests efficiently.
  </p>

  <h3>Express.js</h3>
  <p>
    Serves as the API layer to expose crawl and search endpoints with minimal overhead
    and clear routing.
  </p>

  <h3>BullMQ</h3>
  <p>
    Used to offload heavy crawling tasks to background workers, preventing API blocking
    and enabling scalable, distributed processing.
  </p>

  <h3>Redis</h3>
  <p>
    Acts as a message broker for BullMQ and as a caching layer to improve search
    performance for repeated queries.
  </p>

  <h3>MongoDB</h3>
  <p>
    Used as the persistent storage layer for both crawled documents (URLs, titles)
    and the inverted index. Chosen for its flexible schema and document-oriented model.
  </p>

  <h3>Cheerio</h3>
  <p>
    Used for parsing HTML and extracting meaningful textual content during the crawling
    process.
  </p>

  <h3>Custom Inverted Index</h3>
  <p>
    Implemented from scratch to gain a deep understanding of how search engines store,
    retrieve, and rank documents instead of relying on external tools like Elasticsearch.
  </p>

  <h2>🔍 How Search Works</h2>
  <ol>
    <li>Websites are crawled asynchronously by background workers</li>
    <li>Extracted text is normalized and tokenized</li>
    <li>Words are stored in an inverted index with document-level frequencies</li>
    <li>Search queries are matched against the index</li>
    <li>Results are ranked by relevance and returned with real URLs and titles</li>
  </ol>

  <h2> What This Project Demonstrates</h2>
  <ul>
    <li>Distributed system design</li>
    <li>Background job processing</li>
    <li>Search engine fundamentals</li>
    <li>Efficient data modeling and indexing</li>
    <li>Scalable backend architecture</li>
  </ul>

  <h2> Future Enhancements</h2>
  <ul>
    <li>Search result snippets and keyword highlighting</li>
    <li>Pagination and result limits</li>
    <li>Crawl depth control and rate limiting</li>
    <li>Advanced ranking algorithms (TF-IDF, field weighting)</li>
  </ul>

  <h2> How to Clone and Use This Project</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>git clone https://github.com/sumitchandora/search-engine-backend.git
cd search-engine-backend</code></pre>

<h3>2️⃣ Install Dependencies</h3>
<p>
  Ensure that Node.js is installed on your system, then install the required
  dependencies using npm.
</p>
<pre><code>npm install</code></pre>

<h3>3️⃣ Start Required Services</h3>
<p>
  This project depends on MongoDB and Redis. Make sure both services are running
  locally before starting the application.
</p>
<ul>
  <li>MongoDB – used for storing documents and the inverted index</li>
  <li>Redis – used for background job processing and caching</li>
</ul>

<h3>4️⃣ Start the API Server</h3>
<pre><code>node src/app.js</code></pre>

<p>
  The API server will start on <code>http://localhost:3000</code>.
</p>

<h3>5️⃣ Start the Background Worker</h3>
<p>
  Open a new terminal window and run:
</p>
<pre><code>node src/queue/crawlWorker.js</code></pre>

<p>
  The worker listens for crawl jobs and processes website crawling and indexing
  asynchronously.
</p>

<h3>6️⃣ Use the API</h3>
<ul>
  <li>
    <strong>Crawl a Website</strong><br />
    <code>POST /crawl</code>
  </li>
  <li>
    <strong>Search Indexed Content</strong><br />
    <code>GET /search?q=your+query</code>
  </li>
</ul>

<p>
  Once a website is crawled and indexed, search queries will return ranked results
  containing real URLs and titles.
</p>


  <footer>
    <p>© Distributed Search Engine Backend</p>
  </footer>

</body>
</html>
