import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  vector,
} from "drizzle-orm/pg-core";

export const documentStatus = ["processing", "ready", "failed"] as const;

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  filename: text("filename").notNull(),
  storagePath: text("storage_path").notNull(),
  mimeType: text("mime_type").notNull(),
  status: text("status", { enum: documentStatus }).notNull().default("processing"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const chunks = pgTable(
  "chunks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    chunkIndex: integer("chunk_index").notNull(),
    content: text("content").notNull(),
    // gemini-embedding-2, outputDimensionality: 768 (auto-normalized by the model).
    embedding: vector("embedding", { dimensions: 768 }).notNull(),
    metadata: jsonb("metadata").$type<{ page?: number; heading?: string }>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("chunks_embedding_cosine_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
    index("chunks_document_id_idx").on(table.documentId),
  ],
);
