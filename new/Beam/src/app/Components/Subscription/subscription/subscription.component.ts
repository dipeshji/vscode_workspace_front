import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionService } from 'src/app/Services/subscription_service/subscription.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {
private unsubscribe: Subject<boolean> = new Subject();
vesselemail:String = null
IMOnumber:number = null
successfull:boolean = false
spinner:boolean = false
GPS_key:String = null
Route_key:String = null
AIS_key:String = null
vessel_name:String = null
GPSdisabled:boolean = false
GPSsubdisabled:boolean = true
Routedisabled:boolean = false
Routesubdisabled:boolean = true
AISdisabled:boolean = false
AISsubdisabled:boolean = true
vesselemaildisabled:boolean = false
vesseldisabled:boolean = false
submitdisabled:boolean = false
subscribedisabled:boolean = true
subscribe_services:any
fdata:any
pdata:any
subscription_process:String = "Offline"

  constructor(private message:FlashMessagesService, 
    private pop:NgbModal, 
    private Subscribe:SubscriptionService) { }

  ngOnInit() {
    this.Subscribe.subscribed_services()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
      this.subscribe_services = data.subscribed_services
      if(data.subscribed_services.length === 3){
        this.submitdisabled = true
        this.vesselemaildisabled = true
        this.vesseldisabled = true
      }
      data.subscribed_services.forEach(service => {
        if(service === "GPS"){
          this.GPSdisabled = true
          this.GPSsubdisabled = true
        }
        if(service === "Route"){
          this.Routedisabled = true
          this.Routesubdisabled = true
        }
        if(service === "AIS"){
          this.AISdisabled = true
          this.AISsubdisabled = true
        }
      });
    })
  }

  onChange(value:boolean){
    if(value){
      this.subscription_process = "Online"
    }else{
      this.subscription_process = "Offline"
    }
  }
  sub_services = []
  model = {
    GPS: false,
    Route: false,
    AIS: false
  };

  validation_check(){
    let NoService = this.model.GPS || this.model.Route || this.model.AIS ? true : false
    if(this.vesselemail !== null && this.vessel_name !== null && this.IMOnumber !== null){
      if(NoService)
        return {"status":true,"service":true}
      else
        return {"status":true,"service":false}
    }else{
      if(NoService)
        return {"status":false,"service":true}
      else
        return {"status":false,"service":false}
    }
  }

//========================SUBMIT START=============================
  submit(content,subscriptionprocess){  
   if(this.subscription_process === "Online"){
    if(this.validation_check().status){
      this.spinner = true
      if(this.model.GPS === true)
      this.sub_services.push("GPS")
      if(this.model.Route === true)
      this.sub_services.push("Route")
      if(this.model.AIS === true)
      this.sub_services.push("AIS")


      if(this.sub_services.length === 1 )
      {
        let send_data = {
          vesselemail:this.vesselemail,
          vessel_name:this.vessel_name,
          servicename1:this.sub_services[0],
          subscription_process:this.subscription_process,
          IMOnumber : this.IMOnumber
        }
        this.Subscribe.set_services(send_data)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => {
          console.log(data);
          
          if(data.status === true){
            this.successfull = true
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
            this.vesselemaildisabled = true
            this.vesseldisabled = true
            this.submitdisabled = true
            this.subscribedisabled = false
            this.GPSdisabled = true
            this.Routedisabled = true
            this.AISdisabled = true
        
            if(this.model.GPS){
              this.GPSsubdisabled = false
            }
            if(this.model.Route){
              this.Routesubdisabled = false
           }
           if(this.model.AIS){
            this.AISsubdisabled = false
           }
          }
          else{
            this.successfull = false
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
          }
        })
        this.sub_services = []
        
      }
      else if(this.sub_services.length === 2)
      {
        let send_data = {
          vesselemail:this.vesselemail,
          vessel_name:this.vessel_name,
          servicename1:this.sub_services[0],
          servicename2:this.sub_services[1],
          subscription_process:this.subscription_process,
          IMOnumber : this.IMOnumber
        }
        this.sub_services = []
        this.Subscribe.set_services(send_data)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => { 
          if(data.status === true){
            this.successfull = true
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
            this.vesselemaildisabled = true
            this.vesseldisabled = true
            this.submitdisabled = true
            this.subscribedisabled = false
            this.GPSdisabled = true
            this.Routedisabled = true
            this.AISdisabled = true
            
            if(this.model.GPS){
              this.GPSsubdisabled = false
            }
            if(this.model.Route){
              this.Routesubdisabled = false
           }
           if(this.model.AIS){
            this.AISsubdisabled = false
           }
          }
          else{
            this.successfull = false
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
          }
        })
      }
      else if(this.sub_services.length === 3)
      {
        let send_data = {
          vesselemail:this.vesselemail,
          vessel_name:this.vessel_name,
          servicename1:this.sub_services[0],
          servicename2:this.sub_services[1],
          servicename3:this.sub_services[2],
          subscription_process:this.subscription_process,
          IMOnumber : this.IMOnumber
        }
        this.sub_services = []
        this.Subscribe.set_services(send_data)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => {
          if(data.status === true){
            this.successfull = true
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
            this.vesselemaildisabled = true
            this.vesseldisabled = true
            this.submitdisabled = true
            this.subscribedisabled = false
            this.GPSdisabled = true
            this.Routedisabled = true
            this.AISdisabled = true
            if(this.model.GPS){
              this.GPSsubdisabled = false
            }
            if(this.model.Route){
              this.Routesubdisabled = false
           }
           if(this.model.AIS){
            this.AISsubdisabled = false
           }
          }
          else{
            this.successfull = false
            this.spinner = false
            this.pop.open(content, {ariaLabelledBy: 'modal-basic-title'})
          }
        })
      }
    }else{
      if(!this.validation_check().status)
        this.message.show("IMO Number, Vessel Name and Vessel Email are required! Please provide required fields.",{cssClass:"alert-warning",timeout:6000})
      if(!this.validation_check().service)
        this.message.show("No service selected! please select services you want.",{cssClass:"alert-warning",timeout:6000})
    }
  }else{
    if(this.validation_check().status && this.validation_check().service){
      if(this.model.GPS === true)
        this.sub_services.push("GPS")
      if(this.model.Route === true)
        this.sub_services.push("Route")
      if(this.model.AIS === true)
        this.sub_services.push("AIS")
      let send_data = {
        vesselemail:this.vesselemail,
        vessel_name:this.vessel_name,
        servicename1:this.sub_services[0],
        servicename2:this.sub_services[1],
        servicename3:this.sub_services[2],
        subscription_process:this.subscription_process,
        IMOnumber : this.IMOnumber
      }
    // console.table(send_data)
      this.pop.open(subscriptionprocess, {ariaLabelledBy: 'modal-basic-title'})
        this.Subscribe.set_offline_services(send_data)
         .pipe(takeUntil(this.unsubscribe))
          .subscribe((resp: HttpResponse<Blob>) => {
            this.GPSsubdisabled = false
            this.Routesubdisabled = false
            this.subscribedisabled = false
            let respheader = resp.headers.get('Content-Disposition')
            let filename = respheader
            .split(';')[1]
            .split('filename')[1]
            .split('=')[1]
            .split('/')
            .reverse()[0];
            saveAs(resp.body,filename)
          })
      }else{
        if(!this.validation_check().status)
          this.message.show("IMO Number, Vessel Name and Vessel Email are required! Please provide required fields.",{cssClass:"alert-warning",timeout:6000})
        if(!this.validation_check().service)
          this.message.show("No service selected! please select services you want.",{cssClass:"alert-warning",timeout:6000})
      }
  }
}
//========================SUBMIT END=============================

//========================SUBSCRIBE START========================
  subscribe(content_failed,content_passed,jventure,already){
    this.spinner = true
    let send_keys = {
      vessel_name: this.vessel_name,
      GPS:this.GPS_key,
      Route:this.Route_key,
      AIS:this.AIS_key
    }
    
    this.Subscribe.subscription_check(send_keys)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
      if(data.passed_subscriptions.length && data.failed_subscriptions.length){
        this.pdata = data
        this.fdata = data
        this.pop.open(jventure, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
        data.failed_subscriptions.find((element)=>{
          if(element === "GPS"){
            this.GPSsubdisabled = false
            this.GPSdisabled = true
          }else if(element === "Route"){
            this.Routesubdisabled = false
            this.Routedisabled = true
          }
          else if(element === "AIS"){
            this.AISsubdisabled = false
            this.AISdisabled = true
          }
         
        })
        data.passed_subscriptions.find((element)=>{
          if(element === "GPS"){
            this.GPSdisabled = true
            this.GPSsubdisabled = true
            this.model.GPS = false
          }else if(element === "Route"){
            this.Routedisabled = true
            this.Routesubdisabled = true
            this.model.Route = false
          }else if(element === "AIS"){
            this.AISdisabled = true
            this.AISsubdisabled = true
            this.model.AIS = false
          }
        })
        if(data.already_subscribed.length>=1){
          this.pop.open(already, {ariaLabelledBy: 'modal-basic-title'})
          this.spinner = false
        }
        data.already_subscribed.find((element)=>{
          if(element === "GPS"){
            this.GPSdisabled = true
            this.GPSsubdisabled = true
            this.model.GPS = false
          }else if(element === "Route"){
            this.Routedisabled = true
            this.Routesubdisabled = true
            this.model.Route = false
          }else if(element === "AIS"){
            this.AISdisabled = true
            this.AISsubdisabled = true
            this.model.AIS = false
          }
        })
        this.vesselemaildisabled = false
        this.vesseldisabled = false
      }
      else if(data.passed_subscriptions.length>=1)
      {
        this.pdata = data
        this.pop.open(content_passed, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
        this.vesselemaildisabled = false
        this.vesseldisabled = false
        this.subscribedisabled = true
        this.submitdisabled = false

        if(!this.model.GPS){
          this.GPSdisabled = false
        }
        if(!this.model.Route){
          this.Routedisabled = false
        }
        if(!this.model.AIS){
          this.AISdisabled = false
        }
        
        data.passed_subscriptions.find((element)=>{
          if(element === "GPS"){
            this.GPSsubdisabled = true
            this.GPSdisabled = true
            this.model.GPS = false
          }
          else if(element === "Route"){
            this.Routesubdisabled = true
            this.Routedisabled = true
            this.model.Route = false
          }
          else if(element === "AIS"){
            this.AISsubdisabled = true
            this.AISdisabled = true
            this.model.AIS = false
          }
        })

        if(data.already_subscribed.length >= 1){
          this.pop.open(already, {ariaLabelledBy: 'modal-basic-title'})
          this.spinner = false
          data.already_subscribed.find((element)=>{
            if(element === "GPS"){
              this.GPSdisabled = true
              this.GPSsubdisabled = true
              this.model.GPS = false
            }else if(element === "Route"){
              this.Routedisabled = true
              this.Routesubdisabled = true
              this.model.Route = false
            }else if(element === "AIS"){
              this.AISdisabled = true
              this.AISsubdisabled = true
              this.model.AIS = false
            }
          })
        }
      } 
      else if(data.already_subscribed.length >= 1)
      {
      this.pdata = data
      
      if(data.passed_subscriptions.length>=1)
      {
        this.pdata = data
        this.pop.open(content_passed, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
        this.vesselemaildisabled = false
        this.vesseldisabled = false
        this.subscribedisabled = true
        this.submitdisabled = false

        if(!this.model.GPS){
          this.GPSdisabled = false
        }
        if(!this.model.Route){
          this.Routedisabled = false
        }
        if(!this.model.AIS){
          this.AISdisabled = false
        }
        
        data.passed_subscriptions.find((element)=>{
          if(element === "GPS"){
            this.GPSsubdisabled = true
            this.GPSdisabled = true
            this.model.GPS = false
          }
          else if(element === "Route"){
            this.Routesubdisabled = true
            this.Routedisabled = true
            this.model.Route = false
          }
          else if(element === "AIS"){
            this.AISsubdisabled = true
            this.AISdisabled = true
            this.model.AIS = false
          }
        })
      }

      if(data.already_subscribed.length >= 1){
        this.pop.open(already, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
        data.already_subscribed.find((element)=>{
          if(element === "GPS"){
            this.GPSdisabled = true
            this.GPSsubdisabled = true
            this.model.GPS = false
          }else if(element === "Route"){
            this.Routedisabled = true
            this.Routesubdisabled = true
            this.model.Route = false
          }else if(element === "AIS"){
            this.AISdisabled = true
            this.AISsubdisabled = true
            this.model.AIS = false
          }
        })
      }

      if(data.failed_subscriptions.length>=1){
        this.fdata = data
        this.pop.open(content_failed, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
      }
    }
      else if(data.failed_subscriptions.length>=1){
        this.fdata = data
        this.pop.open(content_failed, {ariaLabelledBy: 'modal-basic-title'})
        this.spinner = false
      }
    })
  }

//========================SUBSCRIBE END========================

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
