import { getCloudinaryPresignedUrl } from "@/actions/getCloudinaryPresignedUrl";
import axios from "axios";

export async function uploadFile(file: File) {
  try {
    // Get signature from server
    const { timestamp, signature } = await getCloudinaryPresignedUrl();

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("resource_type", "auto");
    formData.append("folder", "project-platform");

    // Upload to Cloudinary
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload?api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!}&timestamp=${timestamp}&signature=${signature}`,
      formData
    );

    if (res.data?.secure_url) {
      return res.data.secure_url; // Save URL to form
    }

    return null;
  } catch (err) {
    console.error("Upload failed", err);
    return null;
  }
}
