// src/components/Navbar.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow">
      <Link href="/" className="text-2xl font-bold text-blue-400">
        AuthApp
      </Link>

      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 hover:underline"
              >
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center uppercase">
                  {user.email.charAt(0)}
                </span>
                {user.email}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <form action="/api/auth/logout" method="POST">
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </form>
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

      {/* Mobile Menu Button */}
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
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-14 w-48 bg-white text-black rounded shadow z-50 md:hidden">
            {user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 hover:bg-gray-200">
                    Admin Panel
                  </Link>
                )}
                <form action="/api/auth/logout" method="POST">
                  <button type="submit" className="w-full text-left px-4 py-2 hover:bg-gray-200">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-200">
                  Login
                </Link>
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-200">
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
