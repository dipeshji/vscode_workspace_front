import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { EnvService } from '../../../env.service'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  socket:any;
  readonly uri:String 

  constructor(private env:EnvService) {
    this.uri=this.env.apiUrl
    this.uri = this.uri.replace("http","ws")
    this.socket = io(this.uri)
   }


  getdata(event:String){
    return new Observable((subscriber)=>{
      this.socket.on(event,(data)=>{
        subscriber.next(data)
      })
    })
  }

}
