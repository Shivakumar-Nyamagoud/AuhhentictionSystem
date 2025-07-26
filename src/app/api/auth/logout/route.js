// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies(); 
  cookieStore.set({
    name: 'token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.redirect(
    new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
  );
}
