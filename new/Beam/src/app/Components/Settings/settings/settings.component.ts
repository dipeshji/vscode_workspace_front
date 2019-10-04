import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../Services/setting_service/setting.service'
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  
  IMO_number: number
  Vessel_name: String 
  ECDIS_Type: String = "Furuno"
  Retention_Policy: String = "6 Months" 

  constructor(private settingservice:SettingService,  private flashmessage:FlashMessagesService) { }


  ngOnInit() {
  }
    set_ecdis(event:any){
      this.ECDIS_Type = event.target.value
      console.log(this.ECDIS_Type);
    }

    set_retention(event:any){
      this.Retention_Policy = event.target.value
      console.log(this.Retention_Policy);
    }

    on_submit(){
      console.log("in submit");
      
      let valid = (!!this.IMO_number  &&  !!this.Vessel_name && !!this.ECDIS_Type && !!this.Retention_Policy ? true : false)
      
      if(valid){
        let data={
          IMO: this.IMO_number,
          Name: this.Vessel_name,
          ECDIS_type: this.ECDIS_Type,
          Retention_policy: this.Retention_Policy
        }
        this.settingservice.set_settings(data).subscribe(data => {
          if(data.status === false)
          {
            this.showFlash(data.msg,"alert-warning")
          }
          else
          {
            this.showFlash(data.msg,"alert-success")
          }
        })
      }
      else{
        this.showFlash("All fields are required!","alert-warning")
      }
      
    }

    showFlash(msg,cs){
      this.flashmessage.show(msg, { cssClass: cs, timeout: 3000 });
    }
}