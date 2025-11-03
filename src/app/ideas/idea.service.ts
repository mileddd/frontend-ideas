import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { TcHttpClient } from "../services/tc-http-client.service";
import { environment } from "../../environments/environment";

@Injectable({
    'providedIn' : 'root',
})


export class IdeaService
{

    constructor(private tcHttpClient: TcHttpClient)
    {

    }

    fetchIdeas(): Observable<any>
    {
        return this.tcHttpClient.get(environment.appUrl+'ideas');
    }

    createIdea(params:{title: string,description: string, vote_count: number}): Observable<any>
    {
        return this.tcHttpClient.post(environment.appUrl+'ideas',params);
    }

    upvoteIdea(id: number): Observable<any>
    {
        return this.tcHttpClient.post(environment.appUrl+'ideas/'+id+'/upvote',{});
    }

    downvoteIdea(id: number): Observable<any>
    {
        return this.tcHttpClient.post(environment.appUrl+'ideas/'+id+'/downvote',{});
    }
}