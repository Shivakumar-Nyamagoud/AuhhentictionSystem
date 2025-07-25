// src/app/api/users/[id]/role/route.js
import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PUT(req, { params }) {
  const token = cookies().get('token')?.value;
  const currentUser = verifyToken(token);

  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const userId = parseInt(params.id);
  const users = getUsers();

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  users[index].role = 'admin';
  saveUsers(users);

  return NextResponse.json({ message: 'Role updated to admin' }, { status: 200 });
}
