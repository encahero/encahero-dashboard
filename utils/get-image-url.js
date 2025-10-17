import images from "@/assets/images";
export default function getImageUrl(url, folderName = "feedback") {
  if (typeof url !== "string" || !url) return images.fallbackImg;
  if (url.startsWith("http")) return url;
  else
    return `${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/uploads/${folderName}/${url}`;
}
