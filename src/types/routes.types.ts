import type { ReactNode } from 'react';

export interface IRoute {
	/** Label as `ReactNode` but string is okay. */
	label: ReactNode;
	/** Path for navigation using react router `NavLink`. */
	path: string;
	/** `Iconify` icon props as string. */
	icon: string;
	/** The `React` (page) component for the route. */
	element?: ReactNode;
	/** Array of child route(s) if the route has any child(ren). */
	children?: IRoute[];
}
