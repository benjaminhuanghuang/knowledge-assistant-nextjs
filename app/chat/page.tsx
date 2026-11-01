import { MessageSquare, Plus, Send } from "lucide-react";
import { Suspense } from "react";

import { requireUser } from "@/lib/auth/dal";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatContent />
    </Suspense>
  );
}

async function ChatContent() {
  await requireUser();

  return (
    <div className="flex flex-1">
      <aside className="hidden w-64 flex-col gap-2 border-r p-4 sm:flex">
        <Button variant="outline" className="justify-start">
          <Plus />
          New chat
        </Button>
        <Separator className="my-2" />
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyTitle>No conversations yet</EmptyTitle>
            <EmptyDescription>
              Your saved conversations will show up here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </aside>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <Empty className="flex-1 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare />
            </EmptyMedia>
            <EmptyTitle>Ask your knowledge base a question</EmptyTitle>
            <EmptyDescription>
              Answers are drawn from the documents you&apos;ve uploaded, with
              citations back to the source.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>

        <form className="flex gap-2">
          <Textarea
            placeholder="Ask a question about your documents..."
            className="min-h-11 flex-1 resize-none"
          />
          <Button type="submit" size="icon">
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
}
