// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <div className="mb-2 text-sm font-semibold text-slate-500">
          Shuttle Reservation
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          셔틀 예약 시스템
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          노선/시간을 선택하고 간편하게 예약하세요.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/login"
            className="block w-full rounded bg-slate-900 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
          >
            로그인 하러 가기
          </Link>

          <Link
            href="/dashboard/shuttles"
            className="block w-full rounded border border-slate-200 bg-white py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            (테스트) 대시보드로 이동
          </Link>
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-700">기능</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>노선/운행 시간 조회</li>
            <li>좌석 잔여 확인 및 예약</li>
            <li>내 예약 조회/취소</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Shuttle Reservation
        </div>
      </div>
    </div>
  );
}
