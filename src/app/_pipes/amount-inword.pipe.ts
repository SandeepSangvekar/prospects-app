
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "amountInword"
})

export class AmountInwordPipe implements PipeTransform {
    // a:any = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    // b:any = ['', '', 'Twenty', 'Thirty', 'Fourty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninty'];
    // transform(value: string): any {
    //     if ((value = value.toString()).length > 9) return 'overflow';
    //     let n = ('000000000' + value).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    //     if (!n) return; let str = '';
    //     str += (Number(n[1]) != 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'Crore ' : '';
    //     str += (Number(n[2]) != 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'Lakh ' : '';
    //     str += (Number(n[3]) != 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'Thousand ' : '';
    //     str += (Number(n[4]) != 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'Hundred ' : '';
    //     str += (Number(n[5]) != 0) ? ((str != '') ? 'And ' : '') + (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' + this.a[n[5][1]]) : '';
    //     str += ' Only';
    //     return str;
    // }
     ones:any = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    thousands = ["", "Thousand", "Lakh", "Crore"];
     numberToWords(num:any) {
      if (num === "0") return "Zero";
    
      let numStr = num.toString();
      let word = "";
      let n = numStr.length;
    
      if (n > 9) return "overflow"; // number out of bounds
    
      // Pad the number with leading zeros for easier parsing
      numStr = numStr.padStart(9, "0");
    
      // Split the number into groups of two
      let crore = numStr.slice(0, 2);
      let lakh = numStr.slice(2, 4);
      let thousand = numStr.slice(4, 6);
      let hundred = numStr[6];
      let ten = numStr.slice(7);
    
      if (parseInt(crore) > 0) {
        word += `${this.convertTwoDigits(crore)} Crore `;
      }
      if (parseInt(lakh) > 0) {
        word += `${this.convertTwoDigits(lakh)} Lakh `;
      }
      if (parseInt(thousand) > 0) {
        word += `${this.convertTwoDigits(thousand)} Thousand `;
      }
      if (parseInt(hundred) > 0) {
        word += `${this.ones[hundred]} Hundred `;
      }
      if (parseInt(ten) > 0) {
        word += this.convertTwoDigits(ten);
      }
    
      return word.trim();
    }
    
     convertTwoDigits(num:any) {
      num = parseInt(num, 10);
      if (num < 10) return this.ones[num];
      if (num > 10 && num < 20) return this.teens[num - 11];
      let unit = num % 10;
      let ten = Math.floor(num / 10);
      return `${this.tens[ten]} ${this.ones[unit]}`.trim();
    }
    transform(amount:any) {
      let [rupees, paise] = amount.toString().split(".");
    
      let rupeesInWords = this.numberToWords(parseInt(rupees));
      let paiseInWords = paise ? this.convertTwoDigits(paise.padEnd(2, "0")) : "";
    
      let result = "";
      if (rupeesInWords) {
        result += `${rupeesInWords} Rupees`;
      }
      if (paiseInWords) {
        result += ` and ${paiseInWords} Paise`;
      }    
       result.trim();
       return `${result} Only` 
    }
}
