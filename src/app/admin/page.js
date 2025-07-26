// src/app/admin/page.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db'; // ✅ use Prisma here
import UserRow from '@/components/UserRow';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Replace API fetch with direct DB call
async function getAllUsers() {
  return await prisma.user.findMany();
}

export default async function AdminPage() {
  const cookieStore = await cookies(); // ✅ FIXED
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/login');

  let currentUser;
  try {
    currentUser = jwt.verify(token, JWT_SECRET);
    if (currentUser.role !== 'admin') redirect('/dashboard');
  } catch {
    redirect('/login');
  }

  const users = await getAllUsers();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 border rounded shadow bg-black">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-500">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
