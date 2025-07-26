'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react'; // ✅ Icon import

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }

    fetchUser();
  }, [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow relative">
      <Link href="/" className="text-2xl font-bold text-blue-400">
        AuthApp
      </Link>

      {/* Desktop Section */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <UserCircle size={28} /> {/* ✅ User Icon */}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Section */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-14 w-48 bg-white text-black rounded shadow z-50 md:hidden">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
