"use client";

import CreateProjectForm from "@/components/form/ProjectForm";
import { useParams } from "next/navigation";

export default function ProjectEditPage() {
  const params = useParams();

  const id = params.id;

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <CreateProjectForm id={id} />
      </div>
    </>
  );
}
