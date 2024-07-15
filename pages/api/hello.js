// pages/api/hello.js
export const config = {
  runtime: "edge", // This enables the Edge Runtime for this API route
};

export default async function handler(req) {
  return new Response(JSON.stringify({ message: "Hello from the Edge!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
