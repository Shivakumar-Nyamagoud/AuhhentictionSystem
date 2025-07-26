// src/app/api/users/[id]/role/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PUT(req, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const currentUser = verifyToken(token);

  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const userId = await parseInt(params.id);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: 'admin' },
  });

  return NextResponse.json({ message: 'Role updated to admin' }, { status: 200 });
}

