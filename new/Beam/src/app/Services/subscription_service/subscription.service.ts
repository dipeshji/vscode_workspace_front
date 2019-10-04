import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../../env.service'
import { promise } from 'protractor';
import { async, resolve, reject } from 'q';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http:HttpClient,private env:EnvService) { }

  uri = this.env.apiUrl;

  set_services(services):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post<any>(`${this.uri}/subscribe/submit`,services,{headers:headers})
  }

  set_offline_services(services):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post<any>(`${this.uri}/subscribe/submit`,services,{observe: 'response',headers:headers,responseType: 'blob' as 'json'})
  }

  subscription_check(keys):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post<any>(`${this.uri}/subscribe/keys/subscribe`,keys,{headers:headers})
  }

  subscribed_services():Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.get<any>(`${this.uri}/subscribe/subscribed/services`,{headers:headers})
  }
service:any
  async subscribed():Promise<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.service = await this.http.get<any>(`${this.uri}/subscribe/subscribed/services`,{headers:headers})
    .toPromise()
    console.log("In service");
    
    return this.service
  }
}
