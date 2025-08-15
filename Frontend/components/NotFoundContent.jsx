"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div>
      404 Not Found {reason && `: ${reason}`}
    </div>
  );
}
