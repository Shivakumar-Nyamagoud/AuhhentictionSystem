// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: Number(user.id), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Create a response and attach the cookie
    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // ✅ use true in production
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
