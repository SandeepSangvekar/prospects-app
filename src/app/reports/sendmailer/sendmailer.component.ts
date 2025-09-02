import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
// import { UserLogsService } from 'src/app/_services/user-logs.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendmailer',
  templateUrl: './sendmailer.component.html',
  styleUrls: ['./sendmailer.component.css']
})
export class SendmailerComponent {
  // form!: FormGroup;
  dateSelectForm!: FormGroup;
  searchForm!: FormGroup;
  newsletterForm!: FormGroup;
  currentdate = new Date();
  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  sendMailerData: any[] = [];
  allMailerData: any[] = [];
  newsLetterData:any;
  isNotFound: boolean = true;
  fromDate: any;
  toDate: any;
  masterSelected: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private apiService: ApiService,
    // private userLogs: UserLogsService,
    private datePipe: DatePipe,
    private router:Router

  ) { }

  ngOnInit(): void {
    // this.userLog("REPORTS", "VIEW WALLET LEDGER")

    this.dateSelectForm = this.formBuilder.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });

    this.searchForm=this.formBuilder.group({
      type:[null,],
      domain:[null,],
      netWorth:[null,],
      netWorthValue: [null], 
    })
    this.newsletterForm=this.formBuilder.group({
      newsletter:[null],
    })
    // this.fromDate = this.masterService.dateFilterLast1Day().startDate;
    // this.toDate = this.masterService.dateFilterLast15Days().endDate;
    this.getStart();

    this.getSendMailer();
    this.getNewsletter();
  }

  // get f() { return this.form.controls; }

  getStart() {
    this.dateSelectForm.controls['startDate'].setValue(this.fromDate);
    this.dateSelectForm.controls['endDate'].setValue(this.toDate);
  }

  // getNewsletter() {
  //   let apiLink = '/newsLetter/getMailTemplate';
  //   this.masterService.getListData(apiLink).subscribe((res:any) => {
  //     this.newsLetterData = [];
  //     if (res.status === true) {
  //       this.newsLetterData=res.data
  //     } else {
  //     }
  //   }, error => {
     
  //   }); 
  // }

  
  // Select/Deselect all rows
  selectAllRows() {
    this.sendMailerData.forEach(item => (item.selected = this.masterSelected));
  }

  // Check if all rows are selected, update master checkbox
  checkIfAllSelected() {
    this.masterSelected = this.sendMailerData.every(item => item.selected);
  }
  
  onSearch() {
    const { type, domain, netWorth, netWorthValue } = this.searchForm.value;
  
    this.sendMailerData = this.allMailerData.filter(item => {
      let matches = true;
  
      if (type && item.type !== type) {
        matches = false;
      }
  
      if (domain && !(item.domain?.toLowerCase().includes(domain.toLowerCase()))) {
        matches = false;
      }
  
      if (netWorth && netWorthValue != null) {
        if (netWorth === ">=" && !(item.networthCr >= netWorthValue)) {
          matches = false;
        }
        if (netWorth === "<=" && !(item.networthCr <= netWorthValue)) {
          matches = false;
        }
      }
  
      return matches;
    });
  }
  
  

  getNewsletter() {
    const apiLink = '/newsLetter/getMailTemplate';
    this.masterService.getListData(apiLink).subscribe({
      next: (res: any) => {
        if (res.status === true) {
          this.newsLetterData = res.data;
        } else {
          this.newsLetterData = [];
        }
      },
      error: (err) => {
        console.error('Error fetching newsletter data:', err);
        this.newsLetterData = [];
      }
    });
  }
  
  // getSendMailer() {
  //   this.isNotFound = true;
  //   let apiLink = '/newsLetter/getCustomerList';
  //   this.masterService.getListData(apiLink).subscribe((res:any) => {
  //     this.sendMailerData = [];
  //     if (res.status === true) {
  //       this.isNotFound = false;
  //       this.sendMailerData = res.data;
  //       console.log('this.sendMailerData-->',this.sendMailerData);
  //     } else {
  //       this.isNotFound = false;
  //       this.alertService.warning("Looks like no data available!");
  //     }
  //   }, error => {
  //     this.sendMailerData = [];
  //     this.isNotFound = false;
  //     this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  getSendMailer() {
    this.isNotFound = true;
    let apiLink = '/newsLetter/getCustomerList';
    this.masterService.getListData(apiLink).subscribe({
      next: (res: any) => {
        this.sendMailerData = [];
        if (res.status === true) {
          this.isNotFound = false;
          this.sendMailerData = res.data;
          this.allMailerData = res.data; // store backup
        } else {
          this.isNotFound = false;
          this.alertService.warning("Looks like no data available!");
        }
      },
      error: (error) => {
        this.sendMailerData = [];
        this.isNotFound = false;
        this.alertService.error("Error: " + error.statusText);
      }
    });
  }
  
  onSubmit() {
    if (!this.newsletterForm.value.newsletter) {
      this.alertService.warning("Please select a newsletter!");
      return;
    }
  
    // Collect selected customers
    const selectedIds = this.sendMailerData
      .filter(item => item.selected)
      .map(item => item.id);
  
    if (selectedIds.length === 0) {
      this.alertService.warning("Please select at least one customer!");
      return;
    }
  
    let apiLink = '/newsLetter/sendMail';
    let params = {
      customerIds: selectedIds,
      mailTemplateId: this.newsletterForm.value.newsletter
    };
  
    this.masterService.createDataList(apiLink, params).subscribe({
      next: (res: any) => {
        if (res.status === true) {
          this.getSendMailer();
          this.newsletterForm.reset();
          this.masterSelected = false; // reset master checkbox
          this.sendMailerData.forEach(item => item.selected = false);
          this.alertService.success(res.message);
        } else {
          this.alertService.warning(res.message);
        }
      },
      error: () => {
        this.alertService.error("Unknown Error!");
      }
    });
  }
  
  // userLog(module: any, functionPage: any) {
  //   let params = {
  //     "module": module,
  //     "functionPage": functionPage,
  //     "type": "web"
  //   }
  //   this.userLogs.createLogs(params).subscribe((res: any) => {
  //     console.log(res);
  //   })
  // }
}
