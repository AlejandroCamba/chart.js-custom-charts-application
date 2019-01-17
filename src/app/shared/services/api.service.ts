import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
	baseUrl: String

	constructor() {
		this.baseUrl = `${environment.api_url}`;
		console.log('environment is: ' + this.baseUrl) 
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this.http
		.post(`${this.baseUrl}${path}`, JSON.stringify(body), { headers: this.headers()})
		.catch(this.formatErrors)
		.map(response => response.json());
	}

	headers(): Headers {
		const headers = {
			'Accept': 'application/json',
      	  	'Content-Type': 'application/json'
	    };
	}
	
	private formatErrors(error: any) {
    	return Observable.throw(error.json());
    }
}