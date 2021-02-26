import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate{
	public userData : User;
	public token: string;

	constructor(
		private router: Router,
		private authService: AuthService
		){}

	canActivate(){
		let userData = this.authService.getUser();
		let token = this.authService.getToken();

		if(token && userData){
			return true;
		}else{
			this.router.navigate(['/auth/login']);
			return false;
		}
	}
}
