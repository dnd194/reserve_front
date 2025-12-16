// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // httpOnly 쿠키 받기
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow"
      >
        <h1 className="mb-4 text-xl font-semibold">로그인</h1>
        <div className="mb-3">
          <label className="mb-1 block text-sm">이메일</label>
          <input
            className="w-full rounded border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text" // 일단 텍스트로 변경
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm">비밀번호</label>
          <input
            className="w-full rounded border px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-slate-900 py-2 text-sm font-semibold text-white"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
