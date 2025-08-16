'use client';

import React from 'react';
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

export default EditClientPageContent
