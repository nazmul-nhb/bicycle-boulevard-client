import type { ISingleUser } from './user';

export interface IServerResponse<T> {
	success: boolean;
	message: string;
	status: number;
	data?: T;
}

export interface ILoginResponse {
	user: ISingleUser;
	token: string;
}

export interface IError {
	name: string;
	path: string | number;
	message: string;
}

export interface IErrorResponse extends Omit<IServerResponse<unknown>, 'data'> {
	errors: IError[];
}
