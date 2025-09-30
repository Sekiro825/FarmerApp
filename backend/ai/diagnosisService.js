import supabase from "../../lib/supabaseClient";

/**
 * Uploads a crop photo to Supabase Storage and returns its public URL.
 * @param {Object} photo - React Native ImagePickerAsset or object with uri, fileName, mimeType
 * @returns {Promise<string>} public URL of the uploaded image
 */
export async function uploadCropPhoto(photo) {
  if (!photo || !photo.uri) {
    throw new Error("uploadCropPhoto: invalid photo input");
  }

  const fileUri = photo.uri;
  const fileExt = (photo.fileName || fileUri).split(".").pop() || "jpg";
  const mimeType = photo.mimeType || `image/${fileExt}`;

  // Create a unique path per user and timestamp. If auth user is not available, fall back to anon.
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || "anonymous";
  const filePath = `diagnosis/${userId}/${Date.now()}.${fileExt}`;

  // Read the file into a Blob/ArrayBuffer depending on platform
  let fileBody;
  try {
    // For Expo/React Native fetch() can read local file URIs
    const res = await fetch(fileUri);
    fileBody = await res.blob();
  } catch (err) {
    throw new Error(`Failed reading photo file: ${String(err)}`);
  }

  const { error: uploadError } = await supabase.storage
    .from("crop-photos")
    .upload(filePath, fileBody, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  // Get a public URL. Ensure the bucket is public or use signed URLs if private.
  const { data: publicData } = supabase.storage.from("crop-photos").getPublicUrl(filePath);
  const publicUrl = publicData?.publicUrl;
  if (!publicUrl) {
    throw new Error("Failed to resolve public URL for uploaded photo");
  }
  return publicUrl;
}

/**
 * Sends the image URL to FastRouter API and returns diagnosis data.
 * @param {string} imageUrl
 * @returns {Promise<{ disease: string; confidence: number; severity: string; recommendations: string[] }>} 
 */
export async function analyzeCropImage(imageUrl) {
  if (!imageUrl) {
    throw new Error("analyzeCropImage: imageUrl is required");
  }

  const endpoint = process.env.FASTROUTER_CROP_DIAGNOSIS_URL || "https://api.fastrouter.ai/crop-diagnosis";
  const apiKey = process.env.FASTROUTER_API_KEY;

  const headers = {
    "Content-Type": "application/json",
  };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const body = JSON.stringify({ image_url: imageUrl });

  const response = await fetch(endpoint, { method: "POST", headers, body });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`FastRouter API error: ${response.status} ${text}`);
  }

  /** Expected response shape (example):
   * {
   *   "disease": "Leaf Blight",
   *   "confidence": 0.92,
   *   "severity": "Moderate",
   *   "recommendations": ["Remove affected leaves", "Apply fungicide"]
   * }
   */
  const data = await response.json();

  // Normalize fields
  return {
    disease: data.disease ?? "Unknown",
    confidence: typeof data.confidence === "number" ? data.confidence : Number(data.confidence) || 0,
    severity: data.severity ?? "Unknown",
    recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
  };
}

/**
 * High-level function: upload the photo then analyze via FastRouter.
 * Returns { imageUrl, diagnosis }
 * @param {Object} photo
 */
export async function getDiagnosis(photo) {
  const imageUrl = await uploadCropPhoto(photo);
  const diagnosis = await analyzeCropImage(imageUrl);
  return { imageUrl, diagnosis };
}

export default {
  uploadCropPhoto,
  analyzeCropImage,
  getDiagnosis,
};

