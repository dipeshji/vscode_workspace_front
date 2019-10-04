import { Component, OnInit,OnDestroy } from '@angular/core';
import { GpsdataService } from '../../../Services/gpsdata_service/gpsdata.service'
import { gpsrawdata,gpsparseddata } from '../../../Services/gpsdata_service/rawdata'
import { saveAs } from 'file-saver';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit,OnDestroy {

private unsubscribe: Subject<boolean> = new Subject();
counter:any = 0
rawdata:any = []
parseddata:gpsparseddata[]
template: string =`<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`

  constructor(private gpsdata:GpsdataService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    setInterval(()=>{
      this.gpsdata.get_raw_data()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => 
      {
        this.rawdata =data
        this.counter++
        if(this.counter==5)
        {
          this.rawdata=[]
        }
      });
    },3000)


    setInterval(()=>{
      this.gpsdata.get_parsed_data()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => 
      {
        this.parseddata = data
        this.parseddata.splice(5)
        // console.log(this.parseddata);
      })
    },1000)
  }

  downloadsignal(){
    
    this.gpsdata.download_gps_data()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
    saveAs(data,'gpsdata.csv')
      
    })
  }

  downloadrawdata(){
    this.gpsdata.download_gps_raw_data()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
      console.log(data);
      
    saveAs(data, 'data.bin')
    })
  }

  ngOnDestroy() {
    this.rawdata = []
    this.parseddata = []
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
