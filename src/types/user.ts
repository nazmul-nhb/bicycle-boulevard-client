export interface ICredentials {
	email: string;
	password: string;
}

export interface IRegisterUser extends ICredentials {
	name: string;
	image: File;
    confirm_password:string
}
