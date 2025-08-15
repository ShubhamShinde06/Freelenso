"use client";

import { Suspense } from "react";
import InvoiceContent from "@/components/InvoiceContent";

export default function InvoicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}
