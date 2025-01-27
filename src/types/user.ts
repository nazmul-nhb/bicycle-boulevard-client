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
	role: 'admin' | 'customer';
	iss?: string;
	sub?: string;
	aud?: string[] | string;
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
}

export interface ILoggedInState {
	user: IDecodedUser | null;
	token: string | null;
}
