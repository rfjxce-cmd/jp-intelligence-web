"use client";

import dynamic from "next/dynamic";

const HeroCube = dynamic(() => import("./HeroCube"), { ssr: false });

export default function HeroCubeWrapper() {
  return <HeroCube />;
}
