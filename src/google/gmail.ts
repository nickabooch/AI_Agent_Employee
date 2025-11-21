import { google } from "googleapis";
import { oauth2Client } from "./client.js";

export async function listMessages() {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const res = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10
    });

    const messages = res.data.messages || [];
    const details = await Promise.all(
        messages.map(async (msg) => {
            const m = await gmail.users.messages.get({
                userId: "me",
                id: msg.id!
            });
            return m.data;
        })
    );

    return details;
}
