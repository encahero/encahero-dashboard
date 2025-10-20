import { useState } from "react";
import images from "@/assets/images";
import getImageUrl from "@/utils/get-image-url";

export default function ImageWithFallback({
  src,
  alt,
  folderName = "feedback",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src, folderName));

  const handleError = () => {
    setImgSrc(images.fallbackImg);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className="w-8 h-8 rounded-full dark:bg-white border-1"
      {...props}
    />
  );
}
