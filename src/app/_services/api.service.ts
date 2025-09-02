import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient, private datePipe: DatePipe,) { }

  exportExcel(excelFile:any):void{
    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb, excelFile)
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void{
    const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb:XLSX.WorkBook = { Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName)
  }
  private saveAsExcelFile(buffer:any, fileName: string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION)
    // FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION)
  }

  dateFilter()
{
  let toDate:any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  let filterDate = {
    endDate : toDate.toString()
  }
  return filterDate;
}

}
