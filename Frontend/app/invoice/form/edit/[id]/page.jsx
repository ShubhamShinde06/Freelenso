"use client";

import InvoiceForm from "@/components/form/InvoiceForm";
import { useParams } from "next/navigation";

export default function InvoiceEditPage() {
  const params = useParams();

  const id = params.id;

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <InvoiceForm id={id} />
      </div>
    </>
  );
}
