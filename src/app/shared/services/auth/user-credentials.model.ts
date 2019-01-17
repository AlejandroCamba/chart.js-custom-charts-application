export class UserCredentials {
	private identifiant: string;
	private password: string;

	constructor(identifiant: string, password: string){
		this.identifiant = identifiant;
		this.password = password;
	}

	getIdentifiant(): string {
		return this.identifiant;
	}

	getPassword(): string {
		return this.password;
	}
}