import {Injectable} from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TcHttpClient } from "../services/tc-http-client.service";
import { environment } from "../../environments/environment";

@Injectable({
    'providedIn' : 'root',
})


export class LoginService
{
    currentUser = new BehaviorSubject<any>(null);
    constructor(private tcHttpClient: TcHttpClient)
    {

    }

    loginUser(params:{username: string,password: string}): Observable<any>
    {
        return this.tcHttpClient.post(environment.appUrl+'auth/login',params);
    }

    getUserInfo(): Observable<any>
    {
        const token = sessionStorage.getItem('token');
        if (!token) return new Observable((observer) => observer.complete());

        return this.tcHttpClient.get(environment.appUrl+'auth/getUserInfo').pipe(
        tap(user => this.currentUser.next(user))
        );    
    }
}