// src/components/RoleBadge.js
export default function RoleBadge({ role }) {
  const color = role === 'admin' ? 'bg-red-600' : 'bg-blue-600';
  return (
    <span className={`text-white text-sm px-2 py-1 rounded ${color}`}>
      {role}
    </span>
  );
}
