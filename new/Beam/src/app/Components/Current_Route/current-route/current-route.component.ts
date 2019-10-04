import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentrouteService } from '../../../Services/currentroute_service/currentroute.service'
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-current-route',
  templateUrl: './current-route.component.html',
  styleUrls: ['./current-route.component.css']
})
export class CurrentRouteComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<boolean> = new Subject();
  route: any = []
  routedata: any = []
  showdata: any = []
  routefile: any = [{
    index: String,
    filename: String,
    timsestamp: String,
    source: String,
    destination: String
  }]
  constructor(private currentroute: CurrentrouteService) { }

  ngOnInit() {
    this.currentroute.get_currentroute()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(data => {
      this.route = data
      this.routedata = data[0].Data 
      this.route.forEach(element => {
        this.routefile.index = element.index
        this.routefile.filename = element.Filename
        this.routefile.timsestamp = element.TimeStamp
        this.routefile.source = (element.Filename.split(' - '))[0]
        this.routefile.destination = (element.Filename.split(' - '))[1]
      });
    })
     
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
