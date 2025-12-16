// app/dashboard/shuttles/[id]/page.tsx
import { BookingForm } from './BookingForm';

type Trip = {
  routeId: number;           // 백엔드 응답 필드 이름에 맞춰서 조정
  departureAt: string;
  maxSeats: number;
  bookedCount: number;
};

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const routeId = (await params).id; // "1" 같은 문자열
  console.log('RouteDetailPage routeId:', routeId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/routes/${routeId}/trips`;
  console.log('Trips fetch URL:', url);

  const res = await fetch(url, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    console.error('Failed to fetch trips', await res.text());
    return (
      <div>
        <h1 className="text-xl font-semibold">노선 상세 및 예약</h1>
        <p className="mt-2 text-sm text-red-500">
          운행 정보를 불러오는 데 실패했습니다.
        </p>
      </div>
    );
  }

  const trips: Trip[] = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">노선 상세 및 예약</h1>
      <div className="space-y-3">
        {trips.map((trip) => {
          const remain = trip.maxSeats - trip.bookedCount;

          return (
            <div
              key={trip.departureAt}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
            >
              <div>
                <div className="text-sm text-slate-500">
                  {trip.departureAt}
                </div>
                <div className="text-sm">
                  좌석 {trip.bookedCount}/{trip.maxSeats} (잔여 {remain})
                </div>
              </div>
              <BookingForm routeId={trip.routeId} departureAt={trip.departureAt} disabled={remain <= 0} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
