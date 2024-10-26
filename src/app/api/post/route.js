import { connectDB } from "@/app/lib/db";
import PostModel from "@/models/PostModel";

connectDB();

// CREATE a new post
export async function POST(request) {
  await connectDB();;

  try {
    const body = await request.json();
    const { title, name } = body;

    const post = await PostModel.create({ title, name });
    
    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// GET all posts
export async function GET() {
  await connectDB();

  try {
    const posts = await PostModel.find({});
    
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// UPDATE a post by ID
export async function PUT(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { id, title, name } = body;

    const post = await PostModel.findByIdAndUpdate(
      id,
      { title, name },
      { new: true } // Return the updated document
    );

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE a post by ID
export async function DELETE(request) {
  await dbConnect();

  try {
    const { id } = await request.json();

    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
