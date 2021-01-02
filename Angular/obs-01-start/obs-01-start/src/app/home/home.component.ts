import { ReturnStatement } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    const customIntervalObservale = Observable.create(observer => {
      //   console.log(count);
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("count exceeded limit!!"));
        }
        count++;
      }, 1000)
    })

    this.firstObsSubscription = customIntervalObservale
      .pipe(
        filter(data => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round ' + (data + 1);
        })
      )
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error);
      }, () => {
        alert("completed")
      })
  }


  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}

