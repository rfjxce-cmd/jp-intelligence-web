"use client";

import Image from "next/image";

interface LogoImageProps {
  height: number;
  className?: string;
}

export default function LogoImage({ height, className = "" }: LogoImageProps) {
  return (
    <Image
      src="/logo.png"
      alt="JP Intelligence"
      height={height}
      width={height}
      style={{ height, width: "auto", objectFit: "contain" }}
      className={`logo-img ${className}`}
      priority
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/logo.svg";
      }}
      unoptimized
    />
  );
}
