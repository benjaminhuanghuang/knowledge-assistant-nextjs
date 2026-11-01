"use client";

import { useActionState } from "react";

import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required />
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        <Button type="submit" disabled={pending}>
          {pending ? "Logging in..." : "Log in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
