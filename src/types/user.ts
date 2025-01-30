import type { USER_ROLES } from '../configs/constants';

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface ICredentials {
	email: string;
	password: string;
}

export interface IRegisterUser extends ICredentials {
	name: string;
	image: File;
	confirm_password: string;
}

export interface IDecodedUser {
	email: string;
	role: TUserRole;
	iss?: string;
	sub?: string;
	aud?: string[] | string;
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
}

export interface ISingleUser {
	_id: string;
	name: string;
	email: string;
	image: string;
	role: TUserRole;
	isActive?: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ILoggedInState {
	user: ISingleUser | null;
	token: string | null;
}
