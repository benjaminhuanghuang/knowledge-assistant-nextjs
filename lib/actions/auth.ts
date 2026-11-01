"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
});

export type AuthFormState = { error?: string; message?: string } | undefined;

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and password (8+ characters)." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: error.message };
  }

  redirect("/knowledge-base");
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (formData.get("password") !== formData.get("confirmPassword")) {
    return { error: "Passwords do not match." };
  }

  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and password (8+ characters)." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsed.data);
  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return { message: "Check your email to confirm your account." };
  }

  redirect("/knowledge-base");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
