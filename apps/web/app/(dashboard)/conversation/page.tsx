"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Image alt="logo.png" src="/logo.png" height={400} width={400} />
    </div>
  );
}
