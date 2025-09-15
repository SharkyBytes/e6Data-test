// server.js
import express from "express";
import cors from "cors";

const app = express();

// Heavy CPU work (infinite loop with math operations)
function stressCPU(durationMs) {
  const end = Date.now() + durationMs;
  console.log(`🔥 Starting CPU stress for ${durationMs / 1000} seconds...`);

  while (Date.now() < end) {
    // Waste CPU cycles doing math
    Math.sqrt(Math.random() * Math.random());
    Math.pow(Math.random(), Math.random());
  }

  console.log("✅ CPU stress finished");
}

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the stress test server!" });
});

// Stress endpoint (so you can trigger load via HTTP)
app.get("/stress", (req, res) => {
  res.json({ message: "Starting CPU stress for 75 seconds..." });
  setTimeout(() => process.exit(0), 80000); // Exit after stress + buffer
  stressCPU(75000); // Run heavy work for 75 seconds
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("👉 Visit /stress to start the CPU load test");
});
