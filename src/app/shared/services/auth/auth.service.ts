import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from './user.model';
import { UserCredentials } from './user-credentials.model';

import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';

@Injectable()
export class AuthService {

  	constructor(private apiService: ApiService) { }

  	login(userCredentials: UserCredentials): Observable<string> {
      	return this.apiService
        	.post('auth', 
        		{
        			"identifiant": userCredentials.getIdentifiant(),
        			"password": userCredentials.getPassword()
        		}
        		).map(response => {
                localStorage.setItem("session_token", response.session_token);
            		return localStorage.getItem("session_token");
        		})
  	}

    getToken(): string {
      return localStorage.getItem("session_token");
    }    

    logout(): Observable<boolean> {
      return this.apiService.post('logout', 
        { "session_token": localStorage.getItem("session_token") } 
       ).map(res => {
         localStorage.clear();
         return true;
       });
    }
}