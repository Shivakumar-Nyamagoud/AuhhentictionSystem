// src/components/ProtectedRoute.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth/me');
      if (!res.ok) router.push('/login');
    }
    checkAuth();
  }, [router]);

  return children;
}
