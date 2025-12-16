// app/dashboard/layout.tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-slate-900 text-white">
        <div className="p-4 text-lg font-semibold">Shuttle</div>
        <nav className="px-2 space-y-1">
          <Link
            href="/dashboard"
            className="block rounded px-3 py-2 text-sm hover:bg-slate-700"
          >
            요약
          </Link>
          <Link
            href="/dashboard/shuttles"
            className="block rounded px-3 py-2 text-sm hover:bg-slate-700"
          >
            셔틀 노선
          </Link>
          <Link
            href="/dashboard/bookings"
            className="block rounded px-3 py-2 text-sm hover:bg-slate-700"
          >
            내 예약
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-100 p-6">{children}</main>
    </div>
  );
}
