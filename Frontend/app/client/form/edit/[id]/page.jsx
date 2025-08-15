// app/client/form/edit/[id]/page.jsx

'use client';

import React from 'react';
import ClientForm from '@/components/form/ClientForm';
import { useParams } from 'next/navigation';
import withSuspense from '@/components/withSuspense';

function EditClientPageContent() {
  const { id } = useParams();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClientForm id={id} />
    </div>
  );
}

export default withSuspense(EditClientPageContent);
