import React, { useState, useEffect } from "react";
import getImageUrl from "@/utils/get-image-url";
import images from "@/assets/images";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const ImageWithFallback = ({
  src,
  alt = "image",
  className = "",
  fallbackImg = images.fallbackImg,
  folderName = "feedback",
  style,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));
  const [status, setStatus] = useState("loading"); // "loading" | "loaded" | "error"

  useEffect(() => {
    const validate = async () => {
      const finalSrc = getImageUrl(src);
      const isValid = isValidUrl(finalSrc);
      if (isValid) {
        setImgSrc(finalSrc);
        setStatus("loading");
      } else {
        setImgSrc(fallbackImg);
        setStatus("loaded");
      }
    };
    validate();
  }, [src, folderName, fallbackImg]);

  const handleLoad = () => setStatus("loaded");
  const handleError = () => {
    setStatus("error");
    setImgSrc(fallbackImg);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {status === "loading" && (
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full" />
      )}
      <img
        src={imgSrc}
        alt={status === "error" ? "Error" : alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`object-contain w-full h-full transition-opacity duration-300 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        {...rest}
      />
    </div>
  );
};

export default ImageWithFallback;
