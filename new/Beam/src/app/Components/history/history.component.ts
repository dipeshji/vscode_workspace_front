import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentrouteService } from '../../Services/currentroute_service/currentroute.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,OnDestroy {

  private unsubscribe: Subject<boolean> = new Subject();

  from_date:String

  to_date:String

  routedata:any=[]

  values:any=[]

  showdata:any=[]

  history_data:any=[]

  routefile:any=[{
    id:String,
    index:String,
    filename:String,
    timsestamp:String,
    source:String,
    destination:String
}]


  constructor(private historyservice:CurrentrouteService,private flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }

  search(){
    this.history_data = []
    this.routefile = []
    this.showdata = []
    let tosearch = {
      "From":this.from_date,
      "To":this.to_date
    }
    this.historyservice.get_history(tosearch)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
      if(data.msg){
        this.showFlash(data.msg)
        
      }else
      {
        this.history_data = data
      }
    })
  }


  onclick(i){

    this.routedata = this.history_data[i]
    this.values = Object.values(this.routedata)//Create an array named values
    
    this.routefile.index = this.values[1]
    this.routefile.filename = this.values[2]
    this.showdata = this.values[3]
    this.routefile.timsestamp = this.values[4]
    this.routefile.source = this.values[2].split(' - ')[0]
    this.routefile.destination = this.values[2].split(' - ')[1]
    }


    showFlash(msg){
      this.flashMessage.show(msg, { cssClass: 'alert-warning', timeout: 4000 });
    }

    ngOnDestroy() {
      this.unsubscribe.next(true);
      this.unsubscribe.complete();
    }
  }

