// app/dashboard/shuttles/[id]/BookingForm.tsx
'use client';

import { useTransition } from 'react';
import { bookShuttle } from './actions';

export function BookingForm({
  routeId,
  departureAt,
  disabled,
}: {
  routeId: number;
  departureAt: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    if (disabled) return;
    startTransition(async () => {
      try {
        await bookShuttle(routeId, departureAt);
      } catch (e: any) {
        alert(e.message || '예약에 실패했습니다.');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isPending}
      className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
    >
      {disabled ? '마감' : isPending ? '예약 중...' : '예약하기'}
    </button>
  );
}
