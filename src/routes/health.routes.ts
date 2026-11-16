import { Router, Request, Response } from "express";

const router = Router();

// Liveness: app chalu che ke nahi
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


export default router;