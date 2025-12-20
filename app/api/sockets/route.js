// Note: Socket.io in Next.js App Router requires a custom server setup
// This route handler pattern doesn't work for Socket.io in App Router
// Socket.io should be initialized in a custom server or use lib/socket.js
// For now, this is a placeholder that won't break the build

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Socket.io requires custom server setup" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ message: "Socket.io requires custom server setup" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
