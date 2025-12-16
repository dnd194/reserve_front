// app/dashboard/shuttles/[id]/BookingForm.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { cancelShuttle } from './actions';

export function CancelButton({
  bookId,
}: {
  bookId: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    if (!confirm("정말 예약을 취소하시겠습니까?")) return;

    startTransition(async () => {
      try {
        const res = await cancelShuttle(bookId);
        if (res) {
          alert(res);
          router.refresh();
        }
      } catch (e: any) {
        alert(e.message || '예약취소에 실패했습니다.');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
    >
      {isPending ? '취소 중...' : '취소하기'}
    </button>
    
  );
}
