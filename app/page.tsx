import { FileText, MessageSquare, Quote } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Upload your documents",
    description: "PDF, Word, and Markdown files, organized in one place.",
  },
  {
    icon: MessageSquare,
    title: "Ask in plain language",
    description: "Question your documents the way you'd ask a colleague.",
  },
  {
    icon: Quote,
    title: "Answers with citations",
    description: "Every answer points back to the source it came from.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <section className="flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Your documents, answered.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Upload PDFs, Word docs, and Markdown files. Ask questions in
          natural language. Get answers with citations back to the source.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/demo" />}>
            Try the demo
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/login" />}>
            Log in
          </Button>
        </div>
      </section>

      <section className="grid w-full max-w-4xl gap-4 px-4 pb-24 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="size-5 text-muted-foreground" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
