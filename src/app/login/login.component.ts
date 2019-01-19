import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserCredentials } from '../shared/services/auth/user-credentials.model';
import { User } from '../shared/services/auth/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    loading: boolean = false;
    submitted: boolean = false;
    loginForm: FormGroup;

  	constructor(private authService: AuthService, private formBuilder: FormBuilder){}

  	ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  	}

    get f() { return this.loginForm.controls; }

  	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.authService.login(
          new UserCredentials(this.f.username.value, this.f.password.value)).subscribe( 
            	token => { console.log("token: " + token) },
     	 		    err => console.error(err)
        );
    }
}
