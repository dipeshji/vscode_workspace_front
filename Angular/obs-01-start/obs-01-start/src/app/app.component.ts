import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;
  activatedSub: Subscription;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.activatedSub = this.user.activatedEmitter.subscribe(didActivated => {
      this.userActivated = didActivated;
    })
  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }
}
