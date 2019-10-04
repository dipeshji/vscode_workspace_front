import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../Services/home_service/home.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeservice:HomeService) { }

  ngOnInit() {

    this.homeservice.getdata("data").subscribe(data => {
      console.log(data);
      console.log(this.homeservice.uri);
      
      
    })
  }

}
