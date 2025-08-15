import { Suspense } from 'react';
import AuthContent from '@/components/AuthContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
