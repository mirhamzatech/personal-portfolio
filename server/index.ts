import express, { type Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: unknown;

  const originalResJson = res.json;
  res.json = function(bodyJson: unknown) {
    capturedJsonResponse = bodyJson;
    return originalResJson.call(res, bodyJson);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine.length > 80 ? `${logLine.slice(0, 79)}…` : logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (status >= 500) {
      console.error(err);
    }

    res.status(status).json({ message });
  };
  app.use(errorHandler);

  // Vite/Static handling
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
    app.set("trust proxy", 1);
  }

  // Server startup
  const HOST = process.env.HOST || '127.0.0.1';
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

  server.listen(PORT, HOST, () => {
    log(`✅ Server running in ${process.env.NODE_ENV || "development"} mode at http://${HOST}:${PORT}`);
  });
})();