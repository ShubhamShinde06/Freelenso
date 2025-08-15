// app/client/form/edit/[id]/page.jsx

'use client';

import React, { Suspense } from 'react';
import ClientForm from '@/components/form/ClientForm';
import { useParams } from 'next/navigation';

function EditClientPageContent() {
  const { id } = useParams();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClientForm id={id} />
    </div>
  );
}

export default function EditClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditClientPageContent />
    </Suspense>
  );
}
