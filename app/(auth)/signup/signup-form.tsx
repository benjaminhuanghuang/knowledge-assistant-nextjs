"use client";

import { useActionState } from "react";

import { signup } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

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
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
          />
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        {state?.message && <FieldDescription>{state.message}</FieldDescription>}
        <Button type="submit" disabled={pending}>
          {pending ? "Signing up..." : "Sign up"}
        </Button>
      </FieldGroup>
    </form>
  );
}
