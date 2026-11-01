import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string | null;
};

export async function getOptionalUser(): Promise<CurrentUser | null> {
  "use cache: private";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    return null;
  }

  return { id: data.claims.sub, email: data.claims.email ?? null };
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getOptionalUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
