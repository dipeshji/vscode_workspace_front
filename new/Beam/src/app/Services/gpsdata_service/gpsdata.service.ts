import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { gpsrawdata, gpsparseddata } from './rawdata'
import { Observable } from 'rxjs';
import { EnvService } from '../../../env.service'

@Injectable({
  providedIn: 'root'
})
export class GpsdataService {

  constructor(private httpclient: HttpClient,private env:EnvService) { }

   uri = this.env.apiUrl;
  
   

  get_raw_data(): Observable<gpsrawdata[]>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.get<gpsrawdata[]>(`${this.uri}/position/rawdat`,{headers:headers})
    
  }

  download_gps_data(){
    console.log("get req sent");
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.get(`${this.uri}/position/downloadsignals`,{headers:headers,responseType: 'blob'})
  }

  download_gps_raw_data(){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.httpclient.get(`${this.uri}/position/downloadrawsignals`,{headers:headers,responseType: 'blob'})
  }


  get_parsed_data(): Observable<gpsparseddata[]>{
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.httpclient.get<gpsparseddata[]>(`${this.uri}/position/parseddat`,{headers:headers})
  }

  // get_raw_data(){
  //   let headers = new HttpHeaders();
  //   headers.set('Content-Type','application/json');
  //   return this.httpclient.get(`${this.uri}/position/rawdata`,{headers:headers})
    
  // }
}


