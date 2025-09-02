import { Component, OnInit } from '@angular/core';
import { AccountService, MasterService, SharedService } from 'src/app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  storedData: any;
  userData: any;
  roleMain: any;
  roleInner: any;
  roleInnerSubMaster: any;
  roleInnerSubDoc: any;
  roleInnerSubBusiness: any;
  roleInnerSubUser: any;

  constructor(
    public accountService: AccountService, 
    private masterService: MasterService, 
    private sharedService: SharedService
  ) {
    // this.storedData = this.masterService.getLocalStorage();
    const userDataString = localStorage.getItem('gdUserData');

    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  async ngOnInit() {
    const rolesData: any | null = await this.sharedService.getRoles();
    // console.log("rolesData ===", rolesData);
    if (rolesData) {
      this.roleMain = this.sharedService.convertArrayToObject(rolesData?.mainMenu?.items);
      this.roleInner = this.sharedService.convertArrayToObject(rolesData?.innerMenu?.items);
  
      this.roleInnerSubMaster = this.sharedService.convertArrayToObject(rolesData?.innerSubMenu?.[0]?.items);
      this.roleInnerSubDoc = this.sharedService.convertArrayToObject(rolesData?.innerSubMenu?.[1]?.items);
      this.roleInnerSubBusiness = this.sharedService.convertArrayToObject(rolesData?.innerSubMenu?.[2]?.items);
      this.roleInnerSubUser = this.sharedService.convertArrayToObject(rolesData?.innerSubMenu?.[3]?.items);
    } else {
      console.log("rolesData Error ===", rolesData);
      
    }
  }

  // isRoleHidden(): boolean {
  //   return this.userData.rolename === 'Management';
  // }

  logout() {
    this.accountService.logout();
  }

}
