// app/dashboard/bookings/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function cancelShuttle(bookId: number): Promise<any> {
  console.log("Canceling booking for bookId:", bookId);

  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        bookId,
      }),
    }
  );
  if (!res.ok) {
    throw new Error('이미 예약한 시간대입니다.');
  }

  if (res.ok) {
    console.log("Booking canceled for bookId:", bookId);
    return '예약이 취소되었습니다.';
  }
}
