// /app/invoice-print-send/[id]/page.jsx
"use client";

import { Suspense } from "react";
import InvoicePrintSendPageContent from "@/components/InvoicePrintSendPageContent ";

export default function InvoicePrintSendPage() {
  return (
    <Suspense fallback={<div>Loading invoice...</div>}>
      <InvoicePrintSendPageContent />
    </Suspense>
  );
}
