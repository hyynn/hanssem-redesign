"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionUser {
  email: string;
  name: string;
}

const mockUsers = [
  { email: "test@hanssem.com", password: "1234", name: "테스트 사용자" },
];

export async function login(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };

  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify({ email: user.email, name: user.name }), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}

export async function signup(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) return { error: "모든 항목을 입력해 주세요." };

  const exists = mockUsers.find((u) => u.email === email);
  if (exists) return { error: "이미 사용 중인 이메일입니다." };

  // mock: push to in-memory array (resets on server restart)
  mockUsers.push({ email, password, name });

  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify({ email, name }), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
