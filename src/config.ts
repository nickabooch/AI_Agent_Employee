
import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3978,
  baseUrl: process.env.BASE_URL || "http://localhost:3978",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
    scopes: (process.env.GOOGLE_SCOPES || "https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/gmail.readonly").split(",")
  }
};
