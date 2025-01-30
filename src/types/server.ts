import type { ISingleUser } from "./user";

export interface IServerResponse<T> {
	success: boolean;
	message: string;
	statusCode: number;
	data?: T;
}

export interface ILoginResponse {
	user: ISingleUser;
	token: string;
}
