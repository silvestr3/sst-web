import { env } from "@/env";
import { getServerSession } from "next-auth";
import { options } from "./auth";
import { redirect } from "next/navigation";

export async function api(path: string, init?: RequestInit) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login?expired");
  }

  const baseUrl = env.NEXT_PUBLIC_API_URL;
  const url = new URL(path, baseUrl);

  const request = fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if ((await request).status === 401) {
    redirect("/login?expired");
  }

  return request;
}
