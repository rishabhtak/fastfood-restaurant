import { NextResponse } from "next/server";
import sha1 from "sha1";

// Type for the POST request
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const img = formData.get("file");

    if (!img) {
      return NextResponse.json({ success: false, message: "No image found" });
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadedImageData = await uploadResponse.json();
    return NextResponse.json({
      uploadedImageData,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

// Type for the DELETE request
export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ success: false, message: "No URL found" });
    }

    const regex = /\/uploadimage_folder\/([^/]+)\.webp$/;
    const publicId = url.match(regex);

    if (!publicId || publicId.length < 2) {
      return NextResponse.json({
        success: false,
        message: "Invalid URL format",
      });
    }

    const timestamp = Math.floor(Date.now() / 1000); // Cloudinary expects seconds, not milliseconds
    const stringToSign = `public_id=${
      "uploadimage_folder/" + publicId[1]
    }&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

    const signature = sha1(stringToSign);

    const formData = new FormData();
    formData.append("public_id", "uploadimage_folder/" + publicId[1]);
    formData.append("signature", signature);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY || "");
    formData.append("timestamp", timestamp.toString());

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();
    return NextResponse.json({
      message: "Success",
      result,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}
