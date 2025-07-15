'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CreditCard,
  Wine,
  Package,
  Users,
  LogOut,
  Store,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { href: '/admin/ventas', label: 'Sales', icon: CreditCard },
  { href: '/admin/productos', label: 'Products', icon: Wine },
  { href: '/admin/inventario', label: 'Inventory', icon: Package },
  { href: '/admin/vendedores', label: 'Sellers', icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button for mobile (shown only when sidebar is closed) */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-white border-r w-64 p-6 text-sm transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div>
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-gray-700 font-bold text-lg">
              <Store className="w-5 h-5 mr-2" />
              Wine & Spirits
            </div>
            <button
              className="md:hidden bg-white p-2 rounded-md shadow ml-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <ul className="space-y-3">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    pathname === href
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout fixed to bottom */}
        <div className="pt-6">
          <Link
            href="/login"
            className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log out
          </Link>
        </div>
      </div>
    </>
  );
}
