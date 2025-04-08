import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/gallery?code=your-folder-name
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No access code provided." },
      { status: 400 }
    );
  }

  // List files in the specified folder inside the 'assets' bucket
  const { data, error } = await supabaseClient.storage
    .from("assets")
    .list(code, {
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Supabase list error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery items." },
      { status: 500 }
    );
  }

  // Filter image files and generate public URLs
  const images =
    data
      ?.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
      .map((file) => {
        const { data: publicUrlData } = supabaseClient.storage
          .from("assets")
          .getPublicUrl(`${code}/${file.name}`);
        return publicUrlData.publicUrl;
      }) || [];

  return NextResponse.json({ images });
}
