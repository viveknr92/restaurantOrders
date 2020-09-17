import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req, next){
    let authService = this.injector.get(AuthService);
    const url = `http://${authService.getHostName()}:3000`
    let tokenizedReq = req.clone({
      url: url + req.url,
      setHeaders :{
        'Authorization' : `Bearer ${authService.getToken() }`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return next.handle(tokenizedReq);
  }
}
