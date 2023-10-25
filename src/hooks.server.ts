import { createDbClient } from "$lib/server/db";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
    const client = await createDbClient();
    const db = drizzle(client);
    event.locals = { db };

    const response = await resolve(event);
    client.release();

    return response;
}) satisfies Handle;