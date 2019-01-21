import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  	constructor(private authService: AuthService){}

  	isUserLoggedIn(): boolean {
  		return this.authService.getToken() == null ? false : true;
 	}

 	ngOnInit() {
 		if (this.authService.getToken()!) {   //<-- comment this code block to remain logged in
	 		this.authService.logout().subscribe(res => {
	 			console.log("page reloaded, logging out...");
	 		});
 		}
 	}
}