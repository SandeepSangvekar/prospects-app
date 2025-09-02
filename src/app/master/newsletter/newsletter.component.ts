import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MasterService } from 'src/app/_services/master.service';
import { AlertService } from 'src/app/_services/alert.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  p:number=1;
  limit = environment.pageLimit;
  form!: FormGroup;
  currentdate = new Date();
  searchText: any;
  newsLetterData: any;
  isNotFound:boolean = false;
  constructor(  private formBuilder: FormBuilder,
    private masterService: MasterService,
   private  alertService:AlertService)
  {
  }
  ngOnInit(): void {
  this.form = this.formBuilder.group({
    templateName: [null, Validators.required],
    subject: [null, Validators.required],
    htmlTemplate: [null, Validators.required],
  });
  this.getNewsletter()
  }
  get f() { return this.form.controls; }

  closeEditModal(){
    this.form.reset();
  }
  
  getNewsletter() {
    this.isNotFound = true;
    let apiLink = "/newsLetter/getMailTemplate"
    this.masterService.getListData(apiLink).subscribe((res:any) => {
      this.isNotFound = false;
      this.newsLetterData = [];
      if (res.status === true) {
        // this.newsLetterData = res.data.filter((data:any) => data.active == 'Y');
        this.newsLetterData = res.data;
      } else {
        this.alertService.warning("Looks like no data available!");
      }
    }, error => {
      this.newsLetterData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
   
    
  }
  onSubmit() {
    let apiLink = '/newsLetter/createMailTemplate';
    let params = {
      templateName: this.form.value.templateName,
      subject: this.form.value.subject,
      htmlBody: this.form.value.htmlTemplate,
    };
    this.masterService.createDataList(apiLink, params).subscribe(res => {
      let response: any = res;
      if (response.status == true) {
        this.getNewsletter();
        document.getElementById('cancel')?.click();
        this.form.reset();
        this.alertService.success(response.message);
      } else {
        document.getElementById('cancel')?.click();
        this.alertService.warning(response.message);
      }
    }, (error) => {
        document.getElementById('cancel')?.click();
        this.alertService.error('Unknown Error!');
      })
  }
  
}
