// src/app/layout.js
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Admin Panel',
  description: 'Manage users',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Toaster position="top-center" />
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
