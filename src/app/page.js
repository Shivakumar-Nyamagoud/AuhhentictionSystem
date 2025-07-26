import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;
  try {
    if (token) {
      user = jwt.verify(token, JWT_SECRET);
    }
  } catch {
    user = null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black-500 px-4">
      <div className="bg-black shadow-xl rounded-lg p-10 max-w-lg w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">🔐 Welcome to Auth System</h1>

        <div className="text-gray-700">
          {user ? (
            <div className="space-y-2">
              <p className="text-lg">
                Logged in as <span className="font-semibold">{user.email}</span>
              </p>
              <p>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white">
                  Role: {user.role}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-lg">Please login or register to access your dashboard.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
              >
                Go to Dashboard
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
