"use client";
import { useSearchParams } from "next/navigation";

export default function NotFoundContent() {
  const sp = useSearchParams();
  const reason = sp.get("reason");
  return (
    <main style={{ padding: 24 }}>
      <h1>404 — Page Not Found</h1>
      {reason ? <p>Reason: {reason}</p> : null}
    </main>
  );
}
