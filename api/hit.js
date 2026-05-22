import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const s = (v, m = 500) => (typeof v === "string" ? v.slice(0, m) : null);
    const b = req.body || {};
    const h = req.headers;
    const [host, path, server, ua, ref, ip] = [
      s(b.host, 253), s(b.path, 2048), s(b.server, 100),
      s(h["user-agent"], 512), s(h["referer"], 2048),
      s((h["x-forwarded-for"] || "").split(",")[0].trim() || null, 45),
    ];

    await sql`INSERT INTO hits (host, path, server, user_agent, referrer, ip)
      VALUES (${host}, ${path}, ${server}, ${ua}, ${ref}, ${ip})`;

    return res.status(204).end();
  } catch (e) {
    console.error("hit track error:", e);
    return res.status(500).end();
  }
}
