// src/app/admin/page.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

async function getAllUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function AdminPage() {
  const token = cookies().get('token')?.value;
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
    <div className="max-w-4xl mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 rounded text-white text-sm ${u.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {u.role}
                </span>
              </td>
              <td className="border px-4 py-2">
                {u.role !== 'admin' ? (
                  <form action={`/api/users/${u.id}/role`} method="POST">
                    <input type="hidden" name="_method" value="PUT" />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      formMethod="PUT"
                    >
                      Promote to Admin
                    </button>
                  </form>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
