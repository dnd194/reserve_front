import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const token = (await cookies()).get("access_token")?.value;
  // 예약 정보 fetch
  const bookingsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/me`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
      credentials: "include",
    }
  );

  const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
  console.log("Fetched bookings:", bookings);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* 카드 1: 오늘 예약 */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="text-sm text-slate-500">오늘 예약</h2>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking: any) => (
              <div key={booking.bookId} className="mt-2">
                <p className="text-lg font-semibold">{booking.routeName} / {booking.departureAt}</p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-lg font-semibold text-slate-400">없음</p>
          )}
          </div>

        {/* 카드 2: 전체 예약 수 */}
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="text-sm text-slate-500">총 예약 건수</h2>
          <p className="mt-2 text-lg font-semibold">{bookings.length} 건</p>
        </div>

      </div>

      {/* 빠른 이동 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/shuttles"
          className="rounded-xl bg-slate-900 p-6 text-white shadow hover:bg-slate-800"
        >
          <h3 className="text-lg font-semibold">셔틀 노선 보기 →</h3>
          <p className="mt-1 text-sm text-slate-300">
            노선별 운행 시간표를 확인하고 예약하세요
          </p>
        </Link>

        <Link
          href="/dashboard/bookings"
          className="rounded-xl bg-white p-6 shadow hover:bg-slate-50"
        >
          <h3 className="text-lg font-semibold">내 예약 보기 →</h3>
          <p className="mt-1 text-sm text-slate-500">
            지금까지 예약한 내역을 볼 수 있어요
          </p>
        </Link>
      </div>
    </div>
  );
}
