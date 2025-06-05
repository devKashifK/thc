import { NextResponse } from "next/server";

interface UnsplashPhoto {
  urls: {
    small: string;
  };
  blur_hash: string | null;
  color: string;
}

// Check if access key is configured
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error(
    "⚠️ UNSPLASH_ACCESS_KEY is not set in environment variables. Please add it to .env.local"
  );
}

export async function GET(request: Request) {
  if (!ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const count = searchParams.get("count") || "30";

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}&orientation=squarish&client_id=${ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    const urls = (data as UnsplashPhoto[]).map((photo) => ({
      url: photo.urls.small,
      blur_hash: photo.blur_hash,
      color: photo.color,
    }));

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images from Unsplash" },
      { status: 500 }
    );
  }
}
