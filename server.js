import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    res.set("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Stream error");
  }
});

app.listen(10000, () => {
  console.log("Proxy running on port 10000");
});
