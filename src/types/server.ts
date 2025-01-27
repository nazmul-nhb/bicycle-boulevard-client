export interface IServerResponse<T> {
	success: boolean;
	message: string;
	statusCode: number;
	data?: T;
}

export interface IToken {
	token: string;
}
