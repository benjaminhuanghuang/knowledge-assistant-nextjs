import { Send } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function ChatBubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-4 py-2 text-sm",
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {children}
      </div>
    </div>
  );
}

const sources = [
  { n: 1, title: "employee-handbook.pdf", snippet: "Remote employees accrue 18 PTO days per year." },
  { n: 2, title: "benefits-guide.docx", snippet: "PTO requests are submitted through the HR portal." },
];

export default function DemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Demo</Badge>
        <p className="text-sm text-muted-foreground">
          No sign-in required — ask a question about the preset knowledge
          base below.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 rounded-lg border p-4">
        <ChatBubble role="user">How much PTO do remote employees get?</ChatBubble>
        <ChatBubble role="assistant">
          Remote employees accrue 18 PTO days per year
          <Badge variant="outline" className="ml-1 align-middle">1</Badge>
          . Requests go through the HR portal
          <Badge variant="outline" className="ml-1 align-middle">2</Badge>
          .
        </ChatBubble>

        <Card className="bg-muted/50">
          <CardContent className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-muted-foreground">Sources</p>
            {sources.map((source) => (
              <div key={source.n} className="flex items-start gap-2">
                <Badge variant="outline">{source.n}</Badge>
                <div>
                  <p className="font-medium">{source.title}</p>
                  <p className="text-muted-foreground">{source.snippet}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <form className="flex gap-2">
        <Textarea
          placeholder="Ask a question about the preset knowledge base..."
          className="min-h-11 flex-1 resize-none"
        />
        <Button type="submit" size="icon">
          <Send />
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Want to use your own documents?{" "}
        <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
