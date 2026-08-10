import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lat, lon } = req.query;
    const location = lat && lon ? `${lat},${lon}` : "";
    const resp = await fetch(`https://wttr.in/${location}?format=j1`);
    const data = await resp.json();

    const cur = data.current_condition?.[0];
    const area = data.nearest_area?.[0];

    if (!cur) {
      res.status(500).json({ error: "No weather data" });
      return;
    }

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=900");
    res.status(200).json({
      temp: cur.temp_F,
      tempC: cur.temp_C,
      desc: cur.weatherDesc?.[0]?.value || "",
      humidity: cur.humidity,
      wind: cur.windspeedMiles,
      feelsLike: cur.FeelsLikeF,
      city: area?.areaName?.[0]?.value || "",
      region: area?.region?.[0]?.value || "",
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}
