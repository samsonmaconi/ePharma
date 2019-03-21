import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authentictedToken = this.authService.getToken();
        const authReq = req.clone({
            headers: req.headers.set("Authorizaion","Bearer"+ authentictedToken)
        });
        return next.handle(req);
    }
}