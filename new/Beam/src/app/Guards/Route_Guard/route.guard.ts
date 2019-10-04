import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { EnvService } from '../../../env.service'
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements  CanActivate {
  subscribed_services:any
  Route:boolean = false
  constructor(private env:EnvService, private route:Router, private http:HttpClient){}

  async canActivate(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    await this.http.get(`${this.env.apiUrl}/subscribe/subscribed/services`,{headers:headers})
    .toPromise().then(resp => this.subscribed_services = resp)
    
    this.subscribed_services.subscribed_services.forEach(service => {
      
      if(service === "Route"){
        this.Route = true
      }
    });


    if(this.Route)
    {  
      return true
    }else{
      this.route.navigate(['/subscribe'])
      return false
    }
  }
}