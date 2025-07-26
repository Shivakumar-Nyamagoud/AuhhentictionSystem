'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function UserRow({ user }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePromote = async () => {
    setLoading(true);
    toast.loading('Promoting user...', { id: 'promote' });

    const res = await fetch(`/api/users/${user.id}/role`, {
      method: 'PUT',
    });

    setLoading(false);

    if (res.ok) {
      toast.success('User promoted to admin', { id: 'promote' });
      router.refresh(); // ✅ refresh only needed data
    } else {
      toast.error('Failed to promote user', { id: 'promote' });
    }
  };

  return (
    <tr className="text-center">
      <td className="border px-4 py-2 bg-gray-400">{user.id}</td>
      <td className="border px-4 py-2 ">{user.email}</td>
      <td className="border px-4 py-2">
        <span className={`px-2 py-1 rounded text-white text-sm  ${user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}>
          {user.role}
        </span>
      </td>
      <td className="border px-4 py-2">
        {user.role !== 'admin' ? (
          <button
            onClick={handlePromote}
            disabled={loading}
            className={`px-3 py-1 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Promoting...' : 'Promote to Admin'}
          </button>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}
