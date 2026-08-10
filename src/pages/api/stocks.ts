import type { NextApiRequest, NextApiResponse } from "next";

const SYMBOLS = ["SPY", "QQQ", "AAPL", "NVDA", "GOOGL", "MSFT", "TSLA"];

async function fetchQuote(symbol: string) {
  const resp = await fetch(
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  const data = await resp.json();
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta) return null;

  const price = meta.regularMarketPrice;
  const prevClose = meta.chartPreviousClose ?? meta.previousClose;
  const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

  const nameMap: Record<string, string> = {
    SPY: "S&P 500", QQQ: "Nasdaq 100", AAPL: "Apple",
    NVDA: "NVIDIA", GOOGL: "Alphabet", MSFT: "Microsoft", TSLA: "Tesla",
  };

  return {
    ticker: symbol,
    name: nameMap[symbol] || meta.shortName || symbol,
    price: price?.toFixed(2) ?? "—",
    change: `${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}%`,
    up: changePct >= 0,
  };
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await Promise.allSettled(SYMBOLS.map(fetchQuote));
    const stocks = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled" && r.value != null)
      .map(r => r.value);

    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");
    res.status(200).json({ stocks });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
}
