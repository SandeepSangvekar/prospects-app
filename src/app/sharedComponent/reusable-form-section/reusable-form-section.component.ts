import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService, ApiService, MasterService } from 'src/app/_services';

@Component({
  selector: 'app-reusable-form-section',
  templateUrl: './reusable-form-section.component.html',
  styleUrls: ['./reusable-form-section.component.css']
})
export class ReusableFormSectionComponent {
  @Input() form!: FormGroup;
  @Input() companyList: any;
  @Input() tenderDetailsData: any;
  @Input() filterTenderDetailsData: any;
  @Input() type: any;

  @Output() detailsChanged = new EventEmitter<any>();
  @Output() tenderIdChanged = new EventEmitter<any>();
  @Output() tenderDetailedData = new EventEmitter<any>();

  constructor(
    private alertService: AlertService,
    private apiService: ApiService,
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    // this.getCompanyData();
  }

  // getCompanyData(): void {
  //   const apiLink = `/company/api/v1/getComapanyList`;
  //   this.apiService.getData(apiLink).subscribe((res: any) => {
  //     if (res.status === 200) {
  //       this.companyList = res.result;
  //     } else {
  //       this.alertService.warning("Looks like no data available in type!");
  //     }
  //   }),
  //     (error: any) => {
  //       console.error(error);
  //       this.alertService.error("Error: Unknown Error!");
  //     }
  // }

  getDetails(event: any) {
    debugger
    this.tenderDetailsData = [];
    this.filterTenderDetailsData = [];
    this.form.controls['tender_id'].reset();
    const company_id = event?.target ? (event.target as HTMLInputElement).value : event;
    if (this.type == 'design') {
      var apiLink = `/biding/api/v1/getTenderlist?company_id=${company_id}&mst_tenderstatussubstatus_mapping_id=qualified`
    } else {
      var apiLink = `/biding/api/v1/getTenderlist?company_id=${company_id}`
    }
    // this.apiService.getData(apiLink).subscribe((res: any) => {
    //   if (res.status == 200) {
    //     this.tenderDetailsData = res?.result;
    //     this.detailsChanged.emit(this.tenderDetailsData);
    //   } else {
    //     this.tenderDetailsData = undefined;
    //     this.alertService.warning("Looks like no data available in this client!");
    //   }
    // }),
      (error: any) => {
        this.tenderDetailsData = undefined;
        console.error(error);
        this.alertService.error("Error: Unknown Error!");
      }
  }

  getrefData(tender_id: any) {
    this.filterTenderDetailsData = this.tenderDetailsData?.filter((x: any) => x.tender_id == tender_id);
    this.tenderIdChanged.emit(tender_id);
    this.tenderDetailedData.emit(this.filterTenderDetailsData);
  }

  rowLocation(rowData: any): void {
    // this.masterService.openModal(rowData?.tender_id);
  }
}
