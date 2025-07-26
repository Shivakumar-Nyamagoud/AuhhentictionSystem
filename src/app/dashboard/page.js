import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import RoleBadge from '@/components/RoleBadge';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/login');

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { email: true, role: true },
  });

  if (!user) redirect('/login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-500 px-4">
      <div className="bg-black shadow-lg rounded-lg p-8 max-w-xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-500">
            Dashboard
          </h1>
          <RoleBadge role={user.role} />
        </div>

        <div className="bg-black p-4 rounded border space-y-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">User Info</h2>
          <p className="font-medium text-gray-600"><span >Email : </span> {user.email}</p>
          <p className="font-medium text-gray-600"><span >Role : </span> {user.role}</p>
        </div>

        <form action="/api/auth/logout" method="POST" className="text-right">
          <button
            type="submit"
            className="inline-block px-5 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
