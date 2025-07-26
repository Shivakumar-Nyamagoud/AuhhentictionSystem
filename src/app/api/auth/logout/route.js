// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies(); // ✅ Do NOT use await

  // Clear the token cookie
  cookieStore.set({
    name: 'token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  // Redirect to home or login after logout
  return NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
  );
}
