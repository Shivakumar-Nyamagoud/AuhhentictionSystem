// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getUsers, saveUsers } from '@/lib/db';
import { ROLES } from '@/types/roles';

export async function POST(req) {
  const { email, password } = await req.json();
  const users = getUsers();

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
    role: ROLES.USER,
  };

  users.push(newUser);
  saveUsers(users);

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
