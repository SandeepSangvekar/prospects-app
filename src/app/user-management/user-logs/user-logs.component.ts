import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.css']
})
export class UserLogsComponent implements OnInit {

  logList = [
    { module: 'Test', function: 'meter', hit: '56' },
    { module: 'Test 2', function: 'meter 2', hit: '26' },
    { module: 'Test 3', function: 'meter 3', hit: '126' },
  ];

  logAllData = [
    { module: 'Test', function: 'meter', login: 'user', type: 'web', createdAt: "2023-09-12T15:31:04.620Z" },
    { module: 'Test 2', function: 'meter 2', login: 'user 2', type: 'web', createdAt: "2023-09-12T15:31:04.620Z" },
    { module: 'Test 3', function: 'meter 3', login: 'user 3', type: 'web', createdAt: "2023-09-12T15:31:04.620Z" },
  ];

  form!: FormGroup;

  p: number = 1;
  limit = environment.pageLimit;
  companyData: any = [];
  isNotFound: boolean = false;
  showAll: boolean = false;
  roleData: any;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) { }

  async ngOnInit() {
    // const rolesData: any | null = await this.sharedService.getRoles();
    // this.roleData = this.sharedService?.convertArrayToObject(rolesData?.innerSubMenu?.[0]?.items)?.userLogs;
  }

  showChanges(e: any) {

    if (e.target.checked == true) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

}
