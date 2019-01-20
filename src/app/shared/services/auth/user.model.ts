export class User {
	private sessionToken: string;
	
	constructor(sessionToken: string){
		this.sessionToken = sessionToken;
	}

	getToken(): string {
		return this.sessionToken;
	}
}