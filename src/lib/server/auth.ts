import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from './db/index.ts';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),

	emailAndPassword: {
		enabled: true
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
