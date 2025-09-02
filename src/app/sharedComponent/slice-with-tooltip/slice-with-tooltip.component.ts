import { Component, Input, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-slice-with-tooltip',
  templateUrl: './slice-with-tooltip.component.html',
  styleUrls: ['./slice-with-tooltip.component.css']
})
export class SliceWithTooltipComponent {
  @ViewChild('tooltipElement') tooltipElement!: ElementRef;
  @ViewChild('tooltipElement2') tooltipElement2!: ElementRef;
  @Input() text: string = '';
  @Input() textLong: string = '';

  constructor(
    public alertService: AlertService,
    private renderer: Renderer2
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.hideTooltip();
  }

  showTooltip(event: MouseEvent) {
    let tooltip;
    let textContent;

    if (this.text !== '') {
      if (this.text.length <= 30) {
        return; // Only show tooltip if text length is greater than 30
      } else {
        tooltip = this.tooltipElement.nativeElement;
        textContent = this.text;
      }
    } else {
      if (this.textLong.length <= 140) {
        return; // Only show tooltip if text length is greater than 140
      } else {
        tooltip = this.tooltipElement2.nativeElement;
        textContent = this.textLong;
      }
    }

    // Set the tooltip content
    this.renderer.setProperty(tooltip, 'textContent', textContent);
    this.renderer.addClass(tooltip, 'show');

    // Get the bounding rectangle of the hovered element
    const bounding = (event.target as HTMLElement).getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    // Calculate default position (bottom of the element)
    // let top = bounding.bottom + window.scrollY + 10; // Add a small margin
    // const left = bounding.left + window.scrollX + (bounding.width / 2) - (tooltipWidth / 2);

    let top = bounding.bottom / 0.99;
    const left = bounding.left + (bounding.width / 1) - (tooltipWidth / 2);

    // Check if the tooltip would go off-screen at the bottom
    const viewportHeight = window.innerHeight;
    if (top + tooltipHeight > viewportHeight) {
      // If it goes off-screen, position the tooltip above the element
      top = bounding.top - tooltipHeight - 10; // Add a small margin
    }

    // Set the styles for the tooltip
    this.renderer.setStyle(tooltip, 'top', `${top}px`);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);
    this.renderer.setStyle(tooltip, 'transform', 'translateX(-50%)');
    this.renderer.setStyle(tooltip, 'width', `${tooltipWidth}px`);
    this.renderer.setStyle(tooltip, 'height', `${tooltipHeight}px`);
  }


  hideTooltip() {
    const tooltip = this.text?.length > 30 ? this.tooltipElement.nativeElement : this.tooltipElement2.nativeElement;
    this.renderer.removeClass(tooltip, 'show');
  }

  // copyToClipboard(text: string) {
  //   // Ensure the document is focused
  //   if (document.hasFocus()) {
  //     this.performClipboardCopy(text);
  //   } else {
  //     window.addEventListener('focus', () => {
  //       this.performClipboardCopy(text);
  //     }, { once: true });
  //     window.focus();
  //   }
  // }

  // performClipboardCopy(text: string) {
  //   // Check if Clipboard API is supported and if the site is secure (HTTPS)
  //   if (navigator.clipboard && window.isSecureContext) {
  //     navigator.clipboard.writeText(text).then(() => {
  //       this.alertService.success('Text copied to clipboard');
  //     }).catch(err => {
  //       console.error('Clipboard copy error:', err);
  //       this.alertService.error(`Error: Could not copy text. ${err.message}`);
  //     });
  //   } else {
  //     // Fallback for HTTP or unsupported Clipboard API
  //     let textArea = document.createElement("textarea");
  //     textArea.value = text;
  //     // Avoid scrolling to bottom
  //     textArea.style.position = "fixed";
  //     textArea.style.top = '0';
  //     textArea.style.left = '0';
  //     textArea.style.width = "2em";
  //     textArea.style.height = "2em";
  //     textArea.style.padding = '0';
  //     textArea.style.border = "none";
  //     textArea.style.outline = "none";
  //     textArea.style.boxShadow = "none";
  //     textArea.style.background = "transparent";
  //     document.body.appendChild(textArea);
  //     textArea.focus();
  //     textArea.select();
  //     try {
  //       let successful = document.execCommand('copy');
  //       if (successful) {
  //         this.alertService.success('Text copied to clipboard');
  //       } else {
  //         this.alertService.error('Error: Could not copy text using fallback method');
  //       }
  //     } catch (err) {
  //       console.error('Fallback copy error:', err);
  //       this.alertService.error(`Error: Could not copy text using fallback method. ${(err as Error).message}`);
  //     }
  //     document.body.removeChild(textArea);
  //   }
  // }
  


  copyToClipboard(text: string) {
    if (document.hasFocus()) {
      this.performClipboardCopy(text);
    } else {
      window.addEventListener('focus', () => {
        this.performClipboardCopy(text);
      }, { once: true });
      window.focus();
    }
  }

  performClipboardCopy(text: string) {
    debugger
    // Limit the text length for practical purposes (e.g., 1MB)
    const MAX_TEXT_LENGTH = 1 * 1024 * 1024; // 1 MB in bytes

    if (text.length > MAX_TEXT_LENGTH) {
      this.alertService.error('Error: Text is too long to copy to clipboard.');
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        this.alertService.success('Text copied to clipboard');
      }).catch(err => {
        console.error('Clipboard copy error:', err);
        this.alertService.error(`Error: Could not copy text. ${err.message}`);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.alertService.success('Text copied to clipboard');
        } else {
          this.alertService.error('Error: Could not copy text using fallback method');
        }
      } catch (err) {
        console.error('Fallback copy error:', err);
        this.alertService.error(`Error: Could not copy text using fallback method. ${(err as Error).message}`);
      }

      document.body.removeChild(textArea);
    }
  }

}