export default async function handler(req, res) {
  // Your Hyperbeam live API key
  const API_KEY = "sk_live_xDBYRvmgcJAvpm7f19eYj8yEDbkT7-Bl6DugjkQZqZU";
  
  if (req.method === "POST") {
    // Handle the API request to create the session
    try {
      const apiRes = await fetch("https://api.hyperbeam.com/v1/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "My Hyperbeam Session",
          options: { video: true, audio: true },
        }),
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
    // Serve the HTML page when it's a GET request
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hyperbeam Session Creator</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          #response { white-space: pre-wrap; background: #eee; padding: 15px; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Hyperbeam Session Creator</h1>
        <div id="response">Loading...</div>
        <script>
          async function createSession() {
            try {
              const res = await fetch('', { method: 'POST' });
              const data = await res.json();
              const responseDiv = document.getElementById('response');

              if (res.ok) {
                responseDiv.textContent = \`Session created!\\nID: \${data.id}\\nLink: \${data.url}\`;
              } else {
                responseDiv.textContent = 'Error creating session: ' + (data.error || 'Unknown error');
              }
            } catch(e) {
              document.getElementById('response').textContent = 'Request failed: ' + e.message;
            }
          }
          window.onload = createSession;
        </script>
      </body>
      </html>
    `);
  }
}
