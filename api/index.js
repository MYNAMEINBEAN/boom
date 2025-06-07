export default async function handler(req, res) {
  const API_KEY = "sk_live_xDBYRvmgcJAvpm7f19eYj8yEDbkT7-Bl6DugjkQZqZU";  // Your Hyperbeam API Key

  if (req.method === "POST") {
    try {
      const apiRes = await fetch("https://api.hyperbeam.com/v1/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "My Hyperbeam Session",
          options: {
            video: true,
            audio: true
          }
        })
      });

      const data = await apiRes.json();

      if (!apiRes.ok) {
        res.status(apiRes.status).json({ error: data.error || "Unknown error" });
        return;
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
