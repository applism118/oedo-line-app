import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // The application doesn't need any backend API endpoints since everything
  // is handled in the frontend with localStorage, but we'll keep this route
  // for future extensions if needed

  const httpServer = createServer(app);

  return httpServer;
}
