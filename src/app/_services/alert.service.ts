import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  invalidFields: any;

  constructor(
    private toastr: ToastrService
  ) { }

  success(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }

  warning(message: string) {
    this.toastr.warning(message, 'Warning', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }
  
  info(message: string) {
    this.toastr.info(message, 'Info', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }
  
  error(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getInvalidFields(form: FormGroup) {
    this.invalidFields = [];
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        this.invalidFields.push(key);
      }
    });
  }
}
