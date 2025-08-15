"use client";
import { Suspense } from "react";
import NotFoundContent from "./NotFoundContent";

export default function NotFound() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
