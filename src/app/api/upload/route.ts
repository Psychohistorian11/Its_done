import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: any) {
  const data = await request.formData();
  const image = data.get("file");

  if (!image) {
    return NextResponse.json("No se ha subido ninguna imagen");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      })
      .end(buffer);
  });

  return NextResponse.json({
    message: "image upload",
    url: response.secure_url,
  });
}
