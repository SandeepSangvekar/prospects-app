import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableModal]'
})
export class DraggableModalDirective {
  private isDragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private modalHeader!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.modalHeader = this.el.nativeElement.querySelector('.modal-header.draggable');
    if (this.modalHeader) {
      this.renderer.listen(this.modalHeader, 'mousedown', (event: MouseEvent) => this.onMouseDown(event));
    }
    this.renderer.listen(this.el.nativeElement, 'hide.bs.modal', () => this.resetPosition());
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
    this.offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;

    this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.onMouseMove(e));
    this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;

      this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(this.el.nativeElement, 'left', `${x}px`);
      this.renderer.setStyle(this.el.nativeElement, 'top', `${y}px`);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  resetPosition() {
    this.renderer.removeStyle(this.el.nativeElement, 'left');
    this.renderer.removeStyle(this.el.nativeElement, 'top');
    this.renderer.removeStyle(this.el.nativeElement, 'position');
  }

  //old logic for moving whole modal
  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   this.isDragging = true;
  //   this.offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
  //   this.offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
  // }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (this.isDragging) {
  //     const x = event.clientX - this.offsetX;
  //     const y = event.clientY - this.offsetY;

  //     this.renderer.setStyle(this.el.nativeElement, 'left', x + 'px');
  //     this.renderer.setStyle(this.el.nativeElement, 'top', y + 'px');
  //   }
  // }

  // @HostListener('document:mouseup')
  // onMouseUp() {
  //   this.isDragging = false;
  // }
}
