export async function uploadCV(file) {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "africafirst");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/TON_CLOUD_NAME/raw/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  return result.secure_url;
}