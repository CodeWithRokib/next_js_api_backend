import { connectDB } from "@/app/lib/db";

connectDB();
export async function GET(request) {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
  
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }