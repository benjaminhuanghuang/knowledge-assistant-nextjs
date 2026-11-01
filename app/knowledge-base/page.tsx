import { FileText, Upload } from "lucide-react";
import { Suspense } from "react";

import { requireUser } from "@/lib/auth/dal";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export default function KnowledgeBasePage() {
  return (
    <Suspense fallback={<KnowledgeBaseSkeleton />}>
      <KnowledgeBaseContent />
    </Suspense>
  );
}

async function KnowledgeBaseContent() {
  await requireUser();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Knowledge Base
          </h1>
          <p className="text-sm text-muted-foreground">
            Documents you&apos;ve uploaded for the assistant to search.
          </p>
        </div>
        <Button>
          <Upload />
          Upload document
        </Button>
      </div>

      <Empty className="flex-1 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No documents yet</EmptyTitle>
          <EmptyDescription>
            Upload a PDF, Word, or Markdown file to start building your
            knowledge base.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Upload />
            Upload document
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

function KnowledgeBaseSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
}
