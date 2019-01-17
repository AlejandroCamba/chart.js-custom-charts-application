export class User {
	private sessionToken: string;
	
	constructor(sessionToken: string){
		this.sessionToken = sessionToken;
	}
}