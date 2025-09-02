import { Component, OnInit } from '@angular/core';
import { AlertService, ApiService, SharedService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultRoleMenu } from 'src/app/_helpers/roles-menu';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  p: number = 1;
  limit = environment.pageLimit;
  searchText: any;
  companyData: any = [];
  isNotFound: boolean = false;
  rolesList: any;
  menuList: any;
  form!: FormGroup;
  isSubmitted: boolean = false;
  defaultRoleMenu: any = defaultRoleMenu;
  roleData: any;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) { }

  async ngOnInit() {
    const rolesData: any | null = await this.sharedService.getRoles();
    this.roleData = this.sharedService?.convertArrayToObject(rolesData?.innerSubMenu?.[3]?.items)?.userRoles;
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
    });
    this.getRoleList();
    // console.log("defaultRoleMenu => ", this.defaultRoleMenu);

  }

  get f() { return this.form.controls; }

  getSubMenuItems(mainMenuKey: string) {
    return this.defaultRoleMenu.subMenu[mainMenuKey]?.items || [];
  }

  getRoleList() {
    this.rolesList = [];
    this.isNotFound = false;
    let apiLink = "/role/api/v1/getUserRoleList"
    // this.apiService.getData(apiLink).subscribe((res: any) => {
    //   if (res.status == 200) {
    //     this.isNotFound = false;
    //     this.rolesList = res?.Result;
    //   } else {
    //     this.isNotFound = true;
    //     this.rolesList = undefined;
    //     this.alertService.warning("Looks like no data available!");
    //   }
    // }, (error: any) => {
    //   this.isNotFound = true;
    //   this.rolesList = undefined;
    //   this.alertService.error("Error: Unknown Error!")
    // });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted = true;
      let params = {
        name: this.form.value.name,
        description: this.form.value.description,
      };
      // this.apiService.createMasterRole(params).subscribe((res: any) => {
      //   let response: any = res;
      //   document.getElementById('cancel')?.click();
      //   this.isSubmitted = false;
      //   if (response.status == 200) {
      //     this.getRoleList();
      //     this.form.reset();
      //     this.alertService.success(response.message);
      //   } else {
      //     this.alertService.warning(response.message);
      //   }
      // }, (error: any) => {
      //   document.getElementById('cancel')?.click();
      //   this.alertService.error("Error: Unknown Error!");
      // })
    } else {
      this.alertService.warning("Form is invalid, Please fill the form correctly.");
    }
  }

  // get role data by id
  roleById(data: any) {
    debugger
    this.menuList = [];
    data.roleMenusNew = [];
    if (data.rolemenus) {
      // data.roleMenusNew = JSON.parse(JSON.stringify(data.rolemenus));
      data.roleMenusNew = JSON.parse(JSON.stringify(this.mergeRoleMenus(defaultRoleMenu, data.rolemenus)));
      this.menuList = data;
    } else {
      data.roleMenusNew = JSON.parse(JSON.stringify(this.defaultRoleMenu));
      this.menuList = data;
    }
    console.log("Role=> ", this.menuList);
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  mergeRoleMenus(defaultMenu: any, dbMenu: any): any {
    const result: any = { mainMenu: {}, innerMenu: {}, innerSubMenu: [] };

    // Handle main menu
    // result.mainMenu.options = { ...defaultMenu.mainMenu.options, ...dbMenu.mainMenu?.options };
    result.mainMenu.options = { ...defaultMenu.mainMenu.options};
    result.mainMenu.items = defaultMenu.mainMenu.items.map((defaultItem: any) => {
      const dbItem = dbMenu.mainMenu?.items?.find((item: any) => item.key === defaultItem.key);
      return dbItem
        ? {
          ...defaultItem,
          permissions: Object.keys(defaultItem.permissions).reduce((acc: any, key: string) => {
            acc[key] = dbItem.permissions[key] ?? defaultItem.permissions[key];
            return acc;
          }, {}),
        }
        : defaultItem;
    });

    // Handle inner menu
    // result.innerMenu.options = { ...defaultMenu.innerMenu.options, ...dbMenu.innerMenu?.options };
    result.innerMenu.options = { ...defaultMenu.innerMenu.options };
    result.innerMenu.items = defaultMenu.innerMenu.items.map((defaultItem: any) => {
      const dbItem = dbMenu.innerMenu?.items?.find((item: any) => item.key === defaultItem.key);
      return dbItem
        ? {
          ...defaultItem,
          permissions: Object.keys(defaultItem.permissions).reduce((acc: any, key: string) => {
            acc[key] = dbItem.permissions[key] ?? defaultItem.permissions[key];
            return acc;
          }, {}),
        }
        : defaultItem;
    });

    // Handle inner submenus
    defaultMenu.innerSubMenu.forEach((defaultSubMenu: any) => {
      const dbSubMenu = dbMenu.innerSubMenu?.find((subMenu: any) => subMenu.mainMenu === defaultSubMenu.mainMenu);

      if (dbSubMenu) {
        const mergedSubMenu = {
          mainMenu: defaultSubMenu.mainMenu,
          // options: { ...defaultSubMenu.options, ...dbSubMenu.options },
          options: { ...defaultSubMenu.options },
          items: defaultSubMenu.items.map((defaultItem: any) => {
            const dbItem = dbSubMenu.items.find((item: any) => item.key === defaultItem.key);
            return dbItem
              ? {
                ...defaultItem,
                permissions: Object.keys(defaultItem.permissions).reduce((acc: any, key: string) => {
                  acc[key] = dbItem.permissions[key] ?? defaultItem.permissions[key];
                  return acc;
                }, {}),
              }
              : defaultItem;
          }),
        };

        // Remove any extra items in dbSubMenu not present in defaultSubMenu
        mergedSubMenu.items = mergedSubMenu.items.filter((item: any) =>
          defaultSubMenu.items.some((defaultItem: any) => defaultItem.key === item.key)
        );

        result.innerSubMenu.push(mergedSubMenu);
      } else {
        // Add new submenus from defaultMenu if not present in dbMenu
        result.innerSubMenu.push(defaultSubMenu);
      }
    });

    // Remove any extra submenus in dbMenu not present in defaultMenu
    if (dbMenu.innerSubMenu) {
      dbMenu.innerSubMenu.forEach((dbSubMenu: any) => {
        const existsInDefault = defaultMenu.innerSubMenu.some(
          (defaultSubMenu: any) => defaultSubMenu.mainMenu === dbSubMenu.mainMenu
        );
        if (!existsInDefault) {
          // Do not add this submenu to the result
        }
      });
    }

    return result;
  }



  // update role data
  updateRole() {
    debugger
    this.isSubmitted = true;
    let data = {
      usrl_id: this.menuList?.usrl_id,
      rolemenus: this.menuList?.roleMenusNew
    }
    let apiLink = '/role/api/v1/updateUserRolePermission';
    // this.apiService.putData(apiLink, data).subscribe(data => {
    //   this.isSubmitted = false;
    //   document.getElementById('closeUpdate')?.click();
    //   this.getRoleList();
    //   let response: any = data;
    //   if (response.status === 200) {
    //     this.alertService.success(response.message);
    //   } else {
    //     this.alertService.warning(response.message);
    //   }
    // }, err => {
    //   this.isSubmitted = false;
    //   document.getElementById('closeUpdate')?.click();
    //   this.alertService.error("Unknown Error!");
    // });
  }

}
