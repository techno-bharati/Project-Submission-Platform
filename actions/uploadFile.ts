"use server";

import { cloudinary } from "@/lib/cloudinary";
import GetUser from "./getUser";
import { UploadApiResponse } from "cloudinary";

export default async function UploadToCloudinary(file: File) {
  await GetUser();

  if (!file) {
    return { success: false, msg: "File not found" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result: UploadApiResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "project-platform",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );

        stream.end(buffer);
      }
    );

    return { success: true, public_id: result.public_id };
  } catch (error) {
    console.error("Upload image failed", error);
    return { success: false, msg: "Upload file fail" };
  }
}
