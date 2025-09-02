import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/_services';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  isOpen = false;
  locationArray: any[] = [];

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    // this.masterService.modalState$.subscribe((state: any) => {
    //   this.isOpen = state.isOpen;
    //   this.locationArray = state.locationArray?.result ? state.locationArray?.result : state.locationArray ? state.locationArray : [];
    // });
    this.closeModal();
  }

  closeModal(): void {
    // this.masterService.closeModal();
  }
}
