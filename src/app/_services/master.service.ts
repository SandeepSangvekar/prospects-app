import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { LocationModalComponent } from '../sharedComponent/location-modal/location-modal.component';
import { any } from 'codelyzer/util/function';
import { DatePipe } from '@angular/common';

interface ModalState {
  isOpen: boolean;
  locationArray?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, 
    private modalService: NgbModal,
    private datepipe: DatePipe) { }
  // headers_object = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!)?.data.loginToken, 'companyID': environment.companyID });

  // Get dynamic token and companyID from localStorage

  companyID: any;
  private getAuthHeaders() {
    // const userData = JSON.parse(localStorage.getItem('gdUserData')!);
    // const loginToken = userData?.data?.token;
    const gdUserData = JSON.parse(localStorage.getItem('gdUserData') || '{}');
    const loginToken = gdUserData?.token; // instead of gdUserData.data.loginToken
    // console.log('loginToken-->',loginToken);
    
    // this.companyID = userData?.data?.companyID || environment.companyID; // Use companyID from localStorage if available

    if (!loginToken) {
      throw new Error('Authentication details are missing');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`,
      // 'companyID': this.companyID
    });
  }

  getLocalStorage(): any {
    const item = localStorage.getItem("gdUserData");
    return item ? JSON.parse(item) : null;
  }
  
  // Common Modal End
  getListData(apiLink: any){
    // let data={};
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.get(`${environment.apiUrl}${apiLink}`, httpOptions);
  }
  postDataList(apiLink: any, data:any){
    // let data={};
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.post(`${environment.apiUrl}${apiLink}`,data, httpOptions);
  }
  postDataListById(apiLink: any, data:any, id: any){
    // let data={};
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.post(`${environment.apiUrl}${apiLink}/${id}`,data, httpOptions);
  }
  createDataList(apiLink: any, data: any) { 
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  createDataByFD(apiLink: any, data:any){
    const headers_object = new HttpHeaders({
    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!)?.data.loginToken,
    'companyID': this.companyID
  });
    const httpOptions = { headers: headers_object };
    return this.http.post(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }
  updateDataListByFD(apiLink: any, data:any, id:any){
    const headers_object = new HttpHeaders({
      'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!)?.data.loginToken,
      'companyID': this.companyID
    });
    const httpOptions = { headers: headers_object };
    return this.http.put(`${environment.apiUrl}${apiLink}/${id}`, data, httpOptions);
  }
  updateDataListByPatchByFD(apiLink: any, data: any, id:any) { 
    const headers_object = new HttpHeaders({
      'Authorization': "Bearer " + JSON.parse(localStorage.getItem('gdUserData')!)?.data.loginToken,
      'companyID': environment.companyID
    });
    const httpOptions = { headers: headers_object };
    return this.http.patch(`${environment.apiUrl}${apiLink}/${id}`, data, httpOptions);
  }
  updateDataListByPatch(apiLink: any, data: any, id:any) { 
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.patch(`${environment.apiUrl}${apiLink}/${id}`, data, httpOptions);
  }
  updateByPathParams(apiLink: any, data: any) { 
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.patch(`${environment.apiUrl}${apiLink}`, data, httpOptions);
  }

  deleteDataByPatch(apiLink: any, data: any, id:any) { 
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.patch(`${environment.apiUrl}${apiLink}/${id}`, data, httpOptions);
  }
  updateDataListByPut(apiLink: any, data: any, id:any) { 
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.put(`${environment.apiUrl}${apiLink}/${id}`, data, httpOptions);
  }
  printInvoice(apiLink:any, id:any){
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.get(`${environment.apiUrl}${apiLink}/${id}`, httpOptions);
  }
  changeStatus(apiLink: any,id:any){
    let data={};
    const httpOptions = { headers: this.getAuthHeaders() };
    return this.http.put(`${environment.apiUrl}${apiLink}/${id}`,data, httpOptions);
  }
}
