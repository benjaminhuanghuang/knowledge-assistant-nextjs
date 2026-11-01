import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Transaction pooler (port 6543). Prepared statements are not supported in
// this mode, so they must be disabled on the client.
const client = postgres(process.env.DATABASE_URL!, { prepare: false });

export const db = drizzle({ client });
