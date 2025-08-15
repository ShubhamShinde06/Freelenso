"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import withSuspense from "@/components/withSuspense";

function NotFoundPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code") || "404";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Page Not Found</h1>
      <p>Error Code: {errorCode}</p>
    </div>
  );
}

export default withSuspense(NotFoundPage);
