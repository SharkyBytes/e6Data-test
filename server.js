// server.js
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple function that computes something
function computeSum(a, b) {
  const result = a + b;
  console.log(`✅ The sum of ${a} and ${b} is: ${result}`);
  return result;
}

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the test server!" });
});

// Test route
app.get("/test-job", (req, res) => {
  res.json({ message: "Test job endpoint works!" });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Compute something once
  computeSum(10, 15);

  // Gracefully shut down after 75 seconds
  console.log("⏳ Closing server in 75 seconds...");
  setTimeout(() => {
    server.close(() => {
      console.log("👋 Server closed successfully!");
      process.exit(0); // Exit process
    });
  }, 75000); // 75,000 ms = 75 seconds
});
