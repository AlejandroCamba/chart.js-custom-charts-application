import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from './user.model';
import { UserCredentials } from './user-credentials.model';

import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';

@Injectable()
export class AuthService {
	private cacheUser :User;

  	constructor(private apiService: ApiService) { }

  	login(userCredentials: UserCredentials): Observable<User> {
      	return this.apiService
        	.post('/auth', 
        		{
        			"identifiant": userCredentials.getIdentifiant(),
        			"password": userCredentials.getPassword()
        		}
        		).map(response => {
            		this.cacheUser = new User(response.session_token);
            		return this.cacheUser;
        		})
  	}    	

  	logout(): Observable<User> {
      	return this.apiService
        	.post('/auth', { "session_token": localStorage.getItem["session_token"] }).map(response => {
            	this.cacheUser = new User(response.session_token);
            	return this.cacheUser;
        	})
  	}  

  	getCurrentUser(): Observable<User> {
  		if (this.cacheUser) {
  			return Observable.bind(this.cacheUser);
  		} else {
      		return this.apiService
        	.post('/myinfo').map(response => {
            	this.cacheUser = new User(response.session_token);
            	localStorage.setItem('session_token', response.session_token);
            	return this.cacheUser;
        	})
  		}
  	}


}