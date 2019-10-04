import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../../env.service'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpclient: HttpClient,private env:EnvService) { }


  uri = this.env.apiUrl;


  set_settings(data):Observable<any>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.post<any>(`${this.uri}/settings/add`,data,{headers:headers})
  }
}
