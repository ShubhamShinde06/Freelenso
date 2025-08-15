"use client";

import { Suspense } from "react";
import ProjectContent from "@/components/ProjectContent";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
}
