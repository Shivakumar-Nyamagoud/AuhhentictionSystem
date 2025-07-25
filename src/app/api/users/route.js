// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('token')?.value;
  const user = verifyToken(token);

  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const users = getUsers();
  return NextResponse.json(users, { status: 200 });
}
