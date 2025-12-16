import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CancelButton } from './CancelButton';
// app/dashboard/bookings/page.tsx
type Booking = {
  bookId: number;
  routeId: number;
  routeName: string;
  routeDescription: string;
  departureAt: string;
};

export default async function MyBookingsPage() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    // 로그인 안 되어 있거나 에러
    return (
      <div>
        <h1 className="text-xl font-semibold mb-4">내 예약</h1>
        <p className="text-sm text-red-500">
          예약 정보를 불러오는 데 실패했습니다. (로그인이 필요할 수 있습니다)
        </p>
      </div>
    );
  }

  const bookings: Booking[] = await res.json();

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">내 예약</h1>

      {bookings.length === 0 ? (
        <p className="text-sm text-slate-500">아직 예약 내역이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.bookId}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
            >
              {/* 왼쪽 정보 영역 */}
              <div>
                <div className="text-sm font-semibold">{b.routeName}</div>
                <div className="text-sm text-slate-600">{b.departureAt}</div>
              </div>

              {/* 오른쪽 버튼 영역 */}
              <CancelButton bookId={b.bookId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
