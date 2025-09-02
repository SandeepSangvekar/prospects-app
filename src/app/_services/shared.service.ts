import { ElementRef, Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private encryptionService: EncryptionService
  ) { }

  lastFiveYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  }

  initializeTooltips(element: ElementRef) {
    setTimeout(() => { $(element.nativeElement).find('[data-toggle="tooltip"]').tooltip() }, 1200);
  }

  // getRoles() {
  //   // return JSON.parse(localStorage.getItem('gdUserData') || '')?.rolemenus;
  //   let roleData = this.encryptionService.getFromIndexedDB(environment.indexedDB.keyName);
  //   return console.log("roleData", roleData);
    
  // }

  getRoles = async () => {
    try {
      const roleData = await this.encryptionService.getFromIndexedDB(environment.indexedDB.keyName);
      // console.log("roleData", roleData);
      return roleData;
    } catch (error) {
      console.error('Error retrieving roles:', error);
      return null;
    }
  };

  convertArrayToObject(data: any) {
    const roleObj = data.reduce((acc: any, item: any) => {
      acc[item.key] = item;
      return acc;
    }, {} as Record<string, any>);

    return roleObj;
  }
}
