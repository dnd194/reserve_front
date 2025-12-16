// app/dashboard/shuttles/page.tsx
import Link from 'next/link';

type Route = {
  routeId: number;
  name: string;
  description?: string;
};

export default async function ShuttlesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/routes`,
    { cache: 'no-store', credentials: 'include' },
  );

  const routes: Route[] = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">셔틀 노선</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.routeId}
            href={`/dashboard/shuttles/${route.routeId}`}
            className="rounded-lg bg-white p-4 shadow hover:bg-slate-50"
          >
            <div className="text-base font-semibold">{route.name}</div>
            {route.description && (
              <div className="mt-1 text-sm text-slate-500">
                {route.description}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
