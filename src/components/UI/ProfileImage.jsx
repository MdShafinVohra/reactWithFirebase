import { useState } from "react";

export default function ProfileImage({ src, alt, displayName }) {
  const DUMMY_AVATAR_URL = "https://ui-avatars.com/api/?name=" + displayName + "&background=7B74B1&color=fff&size=128";
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => setImgSrc(DUMMY_AVATAR_URL);

  return (
    <img
      src={imgSrc || DUMMY_AVATAR_URL}
      alt={alt}
      onError={handleError}
      className="w-10 h-10 rounded-full border border-slate-200 shadow-lg"
    />
  );
}
