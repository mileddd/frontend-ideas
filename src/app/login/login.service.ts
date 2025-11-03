import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { TcHttpClient } from "../services/tc-http-client.service";
import { environment } from "../../environments/environment";

@Injectable({
    'providedIn' : 'root',
})


export class LoginService
{

    constructor(private tcHttpClient: TcHttpClient)
    {

    }

    loginUser(params:{username: string,password: string}): Observable<any>
    {
        return this.tcHttpClient.post(environment.appUrl+'auth/login',params);
    }
}