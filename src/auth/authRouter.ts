import { Router } from "express";
import { getAuthUrl, getTokens } from "../google/client.js";

export const authRouter = Router();

// Starts interactive auth and redirects to Google sign-in
authRouter.get("/signin", (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

// Handles the auth redirect and exchanges the code for an access token
authRouter.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  try {
    const tokens = await getTokens(code);
    res.json({ ok: true, tokens: tokens ? "received" : "none" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});
