import Link from "next/link";

import { getOptionalUser } from "@/lib/auth/dal";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export async function AuthButtons() {
  const user = await getOptionalUser();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
          Log in
        </Button>
        <Button nativeButton={false} render={<Link href="/signup" />}>
          Sign up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {user.email}
      </span>
      <form action={logout}>
        <Button variant="outline" type="submit">
          Log out
        </Button>
      </form>
    </div>
  );
}

export function AuthButtonsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-14" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}
