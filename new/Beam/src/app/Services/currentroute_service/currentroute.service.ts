import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../../env.service'

@Injectable({
  providedIn: 'root'
})
export class CurrentrouteService {

  constructor(private httpclient: HttpClient,private env:EnvService) { }

  uri = this.env.apiUrl;


  get_currentroute():Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.get(`${this.uri}/currentroute/routedata`,{headers:headers})
  }

  get_history(tosearch):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.post(`${this.uri}/history/routefida`,tosearch,{headers:headers})
  }
}
