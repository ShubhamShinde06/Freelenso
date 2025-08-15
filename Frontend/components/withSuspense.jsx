"use client";

import { Suspense } from "react";

export default function withSuspense(Component, fallback = null) {
  return function SuspenseWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}
