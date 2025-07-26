// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db'; // ✅ use Prisma instead of getUsers
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req) {
  const { email, password } = await req.json();

  // ✅ Get user from DB using Prisma
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: Number(user.id), email: user.email, role: user.role },
// or use String(user.id) if you're using UUIDs or want string IDs

    JWT_SECRET,
    { expiresIn: '1h' }
  );
const cookieStore = await cookies();
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
