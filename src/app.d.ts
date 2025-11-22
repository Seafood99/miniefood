// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session } from 'svelte-kit-cookie-session';

type SessionData = {
	username: string;
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session<SessionData>;
		}
		interface PageData {
			session: SessionData;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
