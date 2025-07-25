// src/app/dashboard/page.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import RoleBadge from '@/components/RoleBadge';

import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user;
  try {
    user = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <RoleBadge role={user.role} />
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <form action="/api/auth/logout" method="POST">
  <button type='submit' className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
    Logout
  </button>
</form>

    </div>
  );
}
