// app/dashboard/shuttles/[id]/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function bookShuttle(routeId: number, departureAt: string) {
  console.log('Booking shuttle for tripId:', routeId, 'departureAt', departureAt);

  const token = (await cookies()).get('access_token')?.value;
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(
        { 
          routeId, 
          departureAt 
        }
      ),
    },
  );

  if (res.status === 409) {
    throw new Error('이미 예약한 시간대입니다.');
  }
  if (res.ok) {
    console.log('Booking successful for tripId:', routeId, 'departureAt', departureAt);
  }
  // 현재 노선 페이지 다시 fetch
  revalidatePath('/dashboard/shuttles');
}
