import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    'providedIn' : 'root'
})

export class TcHttpClient
{
    
    constructor(private _httpClient: HttpClient)
    {

    }

    public get(url: string): Observable<any>
    {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization',"Bearer "+sessionStorage.getItem('token'));
        return this._httpClient.get(url,{headers : headers});
    }

    public post(url: string,body : {}): Observable<any>
    {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization',"Bearer "+sessionStorage.getItem('token'));
        return this._httpClient.post(url,body,{headers : headers});
    }

    public put(url: string,body: {}): Observable<any>
    {
        let headers = new HttpHeaders();
        return this._httpClient.put(url,body,{headers : headers});
    }

    public delete(url:string): Observable<any>
    {
        let headers = new HttpHeaders();
        return this._httpClient.delete(url,{headers : headers});
    }
}

