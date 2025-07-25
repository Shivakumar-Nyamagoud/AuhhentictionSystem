// src/app/page.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;
  try {
    if (token) {
      user = jwt.verify(token, JWT_SECRET);
    }
  } catch (error) {
    user = null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Auth System 🔐</h1>
      <p className="text-lg mb-6">
        {user
          ? `Logged in as ${user.email} (${user.role})`
          : 'Please login or register to access your dashboard.'}
      </p>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
