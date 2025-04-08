import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const folderPath = path.join(process.cwd(), "public", "assets", code);
  
  try {
    const files = fs.readdirSync(folderPath);
    const imagePaths = files.map(file => `/assets/${code}/${file}`); // Public path for images

    return NextResponse.json({ images: imagePaths });
  } catch (error) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }
}