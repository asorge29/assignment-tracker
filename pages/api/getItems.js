export const runtime = 'edge';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch('https://assignment-tracker-worker.oceans4496.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: req.body.query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  } else if (req.method === "GET") {
    res.status(200).json({ message: "GET method not allowed" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
