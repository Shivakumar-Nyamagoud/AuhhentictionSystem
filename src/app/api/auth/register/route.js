// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { ROLES } from '@/types/roles';

export async function POST(req) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: ROLES.USER,
    },
  });

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
