import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.css']
})
export class ActivityLogsComponent {
  p:number=1;
  limit = environment.pageLimit;
  currentdate = new Date();
  searchText: any;
  activityLogsData: any;
  isNotFound:boolean = false;
  constructor(  
    private masterService: MasterService,
   private  alertService:AlertService)
  {
  }
  ngOnInit(): void {
  this.getActivityLogs();
  }

  getActivityLogs() {
    this.isNotFound = true;
    let apiLink = '/newsLetter/getNewsLetterReport';
    this.masterService.getListData(apiLink).subscribe({
      next: (res: any) => {
        this.activityLogsData = [];
        if (res.status === true) {
          this.isNotFound = false;
          this.activityLogsData = res.data;
        } else {
          this.isNotFound = false;
          this.alertService.warning("Looks like no data available!");
        }
      },
      error: (error) => {
        this.activityLogsData = [];
        this.isNotFound = false;
        this.alertService.error("Error: " + error.statusText);
      }
    });
  }

}
