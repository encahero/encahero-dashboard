import images from "@/assets/images";
export default function getImageUrl(url) {
  if (typeof url !== "string" || !url) return images.fallbackImg;
  if (url.startsWith("http") || url.startsWith("blob")) return url;
  if (url.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${url}`;
  } else return images.fallbackImg;
}
