import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch("https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en");
    const xml = await resp.text();

    const items: { title: string; source: string; time: string }[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const block = match[1];
      const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")?.replace(/&amp;/g, "&")?.replace(/&lt;/g, "<")?.replace(/&gt;/g, ">")?.replace(/&#39;/g, "'")?.replace(/&quot;/g, '"') || "";
      const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1") || "";
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";

      if (title) {
        // Google News titles often end with " - Source Name", strip it
        const cleanTitle = title.replace(/\s*-\s*[^-]+$/, "");
        items.push({ title: cleanTitle || title, source, time: pubDate });
      }
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ headlines: items });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
