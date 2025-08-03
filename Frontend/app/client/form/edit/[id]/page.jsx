'use client'

import ClientForm from "@/components/form/ClientForm";
import { useParams } from "next/navigation";

export default function EditClientPage() {
  const params = useParams();

  const id = params.id;

  return (
    <>
      <div className="w-full h-full flex items-center justify-center ">
        <ClientForm id={id} />
      </div>
    </>
  );
}
