import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { Color, ScaleType } from '@swimlane/ngx-charts';
// import { UserLogsService } from 'src/app/_services/user-logs.service';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  multi = [
    {
      "name": "Jan",
      "series": [
        {
          "name": "2022",
          "value": 7300
        },
        {
          "name": "2023",
          "value": 8940
        }
      ]
    },
  
    {
      "name": "Feb",
      "series": [
        {
          "name": "2022",
          "value": 7870
        },
        {
          "name": "2023",
          "value": 8270
        }
      ]
    },
  
    {
      "name": "Mar",
      "series": [
        {
          "name": "2022",
          "value": 5000
        },
        {
          "name": "2023",
          "value": 5800
        }
      ]
    },
    {
      "name": "Apr",
      "series": [
        {
          "name": "2022",
          "value": 6000
        },
        {
          "name": "2023",
          "value": 7800
        }
      ]
    },
    {
      "name": "May",
      "series": [
        {
          "name": "2022",
          "value": 6200
        },
        {
          "name": "2023",
          "value": 7100
        }
      ]
    },
    {
      "name": "Jun",
      "series": [
        {
          "name": "2022",
          "value": 5800
        },
        {
          "name": "2023",
          "value": 6100
        }
      ]
    },
    {
      "name": "Aug",
      "series": [
        {
          "name": "2022",
          "value": 5300
        },
        {
          "name": "2023",
          "value": 4900
        }
      ]
    },
    {
      "name": "Sep",
      "series": [
        {
          "name": "2022",
          "value": 8900
        },
        {
          "name": "2023",
          "value": 7800
        }
      ]
    },
  ];
  
  lineChart = [
    {
      "name": "2022",
      "series": [
        {
          "name": "Jan",
          "value": 400
        },
        {
          "name": "Feb",
          "value": 380
        },
        {
          "name": "Mar",
          "value": 650
        },
        {
          "name": "Apr",
          "value": 410
        },
        {
          "name": "May",
          "value": 530
        },
        {
          "name": "Jun",
          "value": 470
        },
        {
          "name": "July",
          "value": 580
        },
        {
          "name": "Aug",
          "value": 810
        },
      ]
    },
    {
      "name": "2023",
      "series": [
        {
          "name": "Jan",
          "value": 300
        },
        {
          "name": "Feb",
          "value": 440
        },
        {
          "name": "Mar",
          "value": 620
        },
        {
          "name": "Apr",
          "value": 510
        },
        {
          "name": "May",
          "value": 430
        },
        {
          "name": "Jun",
          "value": 570
        },
        {
          "name": "July",
          "value": 610
        },
        {
          "name": "Aug",
          "value": 710
        },
      ]
    },
  ];

  pieData=[
    {
      "name": "0-30",
      "value": 4940
    },
    {
      "name": "31-60",
      "value": 5000
    },
    {
      "name": "61-90",
      "value": 7200
    },
    {
      "name": ">=91",
      "value": 2200
    },
  ];
  pieDataCust=[
    {
      "name": "Commercial",
      "value": 89400
    },
    {
      "name": "Industrial",
      "value": 59000
    },
    {
      "name": "Residential",
      "value": 99000
    },
  ];
  pieColorsCust:Color = {
    domain: ['#4676C6', '#FFA333', '#cf97ef'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  };
  lineColorScheme:Color={
    domain: ['#315CA4', '#FFA333', '#FFCC8F'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  }
  mainColorScheme:Color ={
    domain: ['#6093E8', '#315CA4'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  }
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabelsPie: boolean = true;
  yAxisLabelBar: string = 'Customers';
  xAxisLabelBar = 'Months';
  
  showXAxisLabelLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  xAxisLabelLine: string = 'Months';
  yAxisLabelLine: string = 'Amount';
  
  colorSchemeOS:Color ={
    domain: ['#7CC9FF', '#1F6799'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  }
  yAxisLabelBarOS: string = 'Amount';
  xAxisLabelBarOS = 'Months';
  
  yAxisLabelBarLoad: string = 'Volume/Orders';
  xAxisLabelBarLoad = 'Months';
  colorSchemeLoad:Color ={
    domain: ['#cf97ef', '#7F5398', '#56BAFF'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  }
  
  pieColorsOL:Color= {
    domain: ['#6093E8', '#cf97ef', '#FFB761', '#A2D9FF'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  };

  pieColorsSegment:Color= {
    domain: ['#6093E8', '#cf97ef', '#FFB761'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  };
  pieColorsType:Color= {
    domain: ['#cf97ef', '#FFB761', '#A2D9FF'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
  };
  pieDataSegment=[
    {
      "name": "High",
      "value": 89400
    },
    {
      "name": "Medium",
      "value": 59000
    },
    {
      "name": "Low",
      "value": 99000
    },
  ];
  pieDataType=[
    {
      "name": "Open",
      "value": 9400
    },
    {
      "name": "Close",
      "value": 5000
    },
    {
      "name": "Pending",
      "value": 6000
    },
  ];
  
  changeData: any;
  
  fiveYear: any;
  segmentData: any;
  isNotFound: boolean = false;
  dataList: any;
  customerBar: any = [];
  revenueBar: any = [];
  orderBar: any = [];
  revenueLineBar: any = [];
  ticketSummary: any = [];
  ticketPieChart: any = [];
  custoSegmentData: any = [];
  orderSegmentData: any = [];
  revenueSegmentData: any = [];
  ticketStatusData: any = [];
  loading: boolean = false;
  bannerData: any[]=[];
  imageLink = environment.apiUrl;
  ticketTotalData: any;
  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private alertService: AlertService,
    // private userLogs: UserLogsService,
    private masterService: MasterService,
    private router: Router,
    

  ) { }
  
  ngOnInit(): void  {
    this.fiveYear = this.sharedService.lastFiveYears();
    this.getBannerList()
    this.getDashboardData();
    // this.getSegmentData();
    // this.userLog("DASHBOARD", "VIEW DASHBOARD")

  }
  onSelect(val:any)
  {
    console.log(val);
    
  }
  getMonthAbbreviation(monthNumber: number): string {
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthAbbreviations[monthNumber - 1] || ''; // Adjust index
  }

  getBannerList(){
    this.isNotFound = true;
    let data={
      // "dateFrom": this.searchForm.value.DateFrom,
      // "dateTo": this.searchForm.value.DateTo,
    }
    let apiLink = '/master/banner/getBanner';
    this.masterService.postDataList(apiLink, data).subscribe((res:any) => {
      
      this.bannerData = [];
      if (res.status === true) {
        this.bannerData = res.data;
        console.log('banner data-->',this.bannerData);
        
        this.isNotFound = false;
      } else {
        this.alertService.warning("Looks like no data available!");
        this.isNotFound = true;
      }
    }, error => {
      this.bannerData = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    });
  }
  getDefaultImage(index: number): string {
    const defaultImages = ['banner1.png', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg'];
    return `../../assets/images/${defaultImages[index % defaultImages.length]}`;
  }
  getImageUrl(image: string): string {
    return `${this.imageLink}/${image}`;
  }
  getDashboardData() {
    this.isNotFound = true;
    this.loading = true;
    let data = {};
    let apiLink = '/dashboard/getDashboard';
    this.masterService.postDataList(apiLink, data).subscribe((res:any) => {
      this.isNotFound = false;
      this.dataList = [];
      if (res.status === true) {
        // this.circleData = res.data.filter((data:any) => data.active == 'Y');
        this.loading = false;
        this.dataList = res.data;
        console.log('dashboardData', this.dataList);
        
        // Define a mapping for month numbers to month abbreviations
        let monthAbbreviations = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        // Customer bar start
        this.customerBar = this.dataList.customerGraph.map((el: any) => {
          const monthAbbreviation = monthAbbreviations[el.createdMonth - 1]; // Adjust index
          return {
            "name": monthAbbreviation,
            "series": [
              { "name": el.createdYear.toString(), "value": el.createdCount }
            ]
          };
        });

        // Customer segment start
        this.custoSegmentData = [
          {
            name: this.dataList.totalCustomerSegmentWise[0].segment,
            value: this.dataList.totalCustomerSegmentWise[0].customerCount
          },
          {
            name: this.dataList.totalCustomerSegmentWise[1].segment,
            value: this.dataList.totalCustomerSegmentWise[1].customerCount
          },
          // {
          //   name: 'Low',
          //   value: this.dataList.totalCustomerSalesDayWise[0].lowPriorityCount
          // }
          
        ];

        // Order segment start
        this.orderSegmentData = [
          {
            name: this.dataList.totalOrdersSegmentWise[0].customerSegment,
            value: this.dataList.totalOrdersSegmentWise[0].salesCount
          },
          {
            name: this.dataList.totalOrdersSegmentWise[1].customerSegment,
            value: this.dataList.totalOrdersSegmentWise[1].salesCount
          },
          
        ];

        // order bar start
        this.orderBar = this.dataList.orderGraph.map((el: any) => {
          const monthAbbreviation = monthAbbreviations[el.createdMonth - 1]; // Adjust index
          return {
            "name": monthAbbreviation,
            "series": [
              { "name": el.createdYear.toString(), "value": el.createdCount }
            ]
          };
        });        
        
        // revenueLineBar start
        this.revenueLineBar = this.dataList.revenueGraph.map((el: any) => {
          return {
            "name": `${this.getMonthAbbreviation(el.createdMonth)} ${el.createdYear}`,
            "series": [
              { "name": this.getMonthAbbreviation(el.createdMonth), "value": el.revenueCount }
            ]
          };
        });

        this.revenueBar = this.dataList.revenueGraph.map((el: any) => {
          const monthAbbreviation = monthAbbreviations[el.createdMonth - 1]; // Adjust index
          return {
            "name": monthAbbreviation,
            "series": [
              { "name": el.createdYear.toString(), "value": el.revenueCount }
            ]
          };
        });

        // Revenue segment start
        this.revenueSegmentData = [
          {
            name: this.dataList.totalRevenueSegmentWise[0].customerSegment,
            value: this.dataList.totalRevenueSegmentWise[0].revenueCount
          },
          {
            name: this.dataList.totalRevenueSegmentWise[1].customerSegment,
            value: this.dataList.totalRevenueSegmentWise[1].revenueCount
          },
          
      ];

      this.ticketSummary = this.dataList.ticketSummary;
      // ticketSummary end

      // ticketPriority pie chart start
      // this.ticketPieChart = this.dataList.ticketPriority.map((priority: any) => {
      //   return {
      //     name: priority.name,
      //     value: priority.value
      //   };
      // });

      this.ticketPieChart = [
        {
          name: 'High',
          value: this.dataList.ticketPriority[0].highPriorityCount
        },
        {
          name: 'Medium',
          value: this.dataList.ticketPriority[0].mediumPriorityCount
        },
        {
          name: 'Low',
          value: this.dataList.ticketPriority[0].lowPriorityCount
        }
        
      ];
      // ticketPriority pie chart end
      // ticketStatusData pie chart start
      this.ticketStatusData = [
        {
          name: 'WIP',
          value: this.dataList.ticketStatus[0].wipCount
        },
        {
          name: 'Closed',
          value: this.dataList.ticketStatus[0].closedCount
        },
        {
          name: 'Pending',
          value: this.dataList.ticketStatus[0].pendingCount
        }
        
      ];
        
      } else {
        this.alertService.warning("Looks like no data available in dashboard!");
      }
    }, error => {
      this.dataList = [];
      this.isNotFound = false;
      this.alertService.error("Error: " + error.statusText)
    }); 
  }
  
  
  // getSegmentData() {
  //   this.segmentData = [];
  //   let apiLink = '/master/segmentMaster/getSegment';
  //   this.apiService.getDataList(apiLink).subscribe((res:any) => {
  //     if (res.status === true) {
  //       this.segmentData = res.data;
  //     } else {
  //       this.alertService.warning("No data available in Segment dropdown.");
  //     }
  //   }, error => {
  //     this.segmentData = [];
  //     // this.alertService.error("Error: " + error.statusText)
  //   });
  // }

  getRevenueTotal() {
    this.router.navigate(['/reports/get-revenues'], { queryParams: { fromDashboard: 'true' } });
  }
  
  getRevenueLastMonth() {
    const today = new Date();
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    const queryParams = {
      fromLastMonth: 'true',
      fromDate: this.formatDate(lastMonthStart),
      toDate: this.formatDate(lastMonthEnd)
    };

    this.router.navigate(['/reports/get-revenues'], { queryParams });
  }

  getRevenueMTD(){
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const queryParams = {
      fromMTD: 'true',
      fromDate: this.formatDate(currentMonthStart),
      toDate: this.formatDate(today)
    };
    this.router.navigate(['/reports/get-revenues'], { queryParams });
  }

  getCustomersTotal() {
    const queryParams = {
      fromDashboard: 'true',
      mob: 'false', // Set the 'mob' parameter to 'false'
    };
    this.router.navigate(['/master/customer'], { queryParams });
  }
  getCustomersLastMonth(){
    const today = new Date();
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    const queryParams = {
      fromLastMonth: 'true',
      mob: 'false',
      fromDate: this.formatDate(lastMonthStart),
      toDate: this.formatDate(lastMonthEnd)
    };
    this.router.navigate(['/master/customer'], { queryParams });
  }
  getCustomersMTD(){
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const queryParams = {
      fromMTD: 'true',
      mob: 'false',
      fromDate: this.formatDate(currentMonthStart),
      toDate: this.formatDate(today)
    };
    this.router.navigate(['/master/customer'], { queryParams });
  }

  getOrdersTotal() {
    this.router.navigate(['/reports/get-orders'], { queryParams: { fromDashboard: 'true' } });
  }

  getOrdersLastMonth() {
    const today = new Date();
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const queryParams = {
      fromLastMonth: 'true',
      fromDate: this.formatDate(lastMonthStart),
      toDate: this.formatDate(lastMonthEnd)
    };

    this.router.navigate(['/reports/get-orders'], { queryParams });
  }

  getOrdersMTD(){
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const queryParams = {
      fromMTD: 'true',
      fromDate: this.formatDate(currentMonthStart),
      toDate: this.formatDate(today)
    };
    this.router.navigate(['/reports/get-orders'], { queryParams });
  }

  getTicketsTotal() {
    this.router.navigate(['/transaction/tickets'], { queryParams: { fromDashboard: 'true' } });
  }
  
  getTicketsLastMonth() {
    const today = new Date();
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const queryParams = {
      fromLastMonth: 'true',
      fromDate: this.formatDate(lastMonthStart),
      toDate: this.formatDate(lastMonthEnd)
    };

    this.router.navigate(['/transaction/tickets'], { queryParams });
  }

  getTicketsMTD() {
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const queryParams = {
      fromMTD: 'true',
      fromDate: this.formatDate(currentMonthStart),
      toDate: this.formatDate(today)
    };
    this.router.navigate(['/transaction/tickets'], { queryParams });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  
  onPieChartSelect(event: any): void {
    const segment = event.name; // Get the name of the clicked segment
    // Navigate to the desired page with the segment parameter
    this.router.navigate(['/master/customer'], { queryParams: { segment: segment } });
  }
  
  onOrderSegSelect(event: any): void {
    const segment = event.name; // Get the name of the clicked segment
    console.log('Order segment -->', segment);
    
    // Navigate to the desired page with the segment parameter
    this.router.navigate(['/reports/get-orders'], { queryParams: { segment: segment } });
  }

  onRevenueSegSelect(event: any): void {
    const segment = event.name; // Get the name of the clicked segment
    console.log('revenue segment -->', segment);
    
    // Navigate to the desired page with the segment parameter
    this.router.navigate(['/reports/get-revenues'], { queryParams: { segment: segment } });
  }

  onRevenueBarSelect(event: any): void {
    
    console.log("Event received from chart click:", event);

    const selectedYear = parseInt(event.name);  // Assuming this is correctly capturing the year
    const selectedMonthAbbr = event.series;  // Month abbreviation from the 'series'

    console.log("Selected Month Abbreviation:", selectedMonthAbbr);
    console.log("Selected Year:", selectedYear);

    // Convert the month abbreviation to a month number
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const selectedMonthIndex = monthAbbreviations.indexOf(selectedMonthAbbr); // This should be from 0 (Jan) to 11 (Dec)

    console.log('selectedMonthIndex-->', selectedMonthIndex);
    
    if (selectedMonthIndex === -1) {
        console.error('Invalid month abbreviation:', selectedMonthAbbr);
        return;
    }

    // Set up the dates
    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex, + 1, 0).getDate();
    const fromDate = new Date(selectedYear, selectedMonthIndex,firstDayOfMonth +1);  // First day of the selected month
    const lastDayOfMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate(); // Last day of the selected month
    const toDate = new Date(selectedYear, selectedMonthIndex, lastDayOfMonth + 1); // Last day of the selected month

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        console.error('Invalid date created', { fromDate, toDate });
        return;
    }

    console.log('From Date:', fromDate.toISOString().split('T')[0]); // YYYY-MM-DD
    console.log('To Date:', toDate.toISOString().split('T')[0]); // YYYY-MM-DD

    this.router.navigate(['/reports/get-revenues'], {
        queryParams: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0],
            fromDashboard: 'true' // Add the fromDashboard parameter
        }
    });
  }

  onOrderBarSelect(event: any): void {
    
    console.log("Event received from chart click:", event);

    const selectedYear = parseInt(event.name);  // Assuming this is correctly capturing the year
    const selectedMonthAbbr = event.series;  // Month abbreviation from the 'series'

    console.log("Selected Month Abbreviation:", selectedMonthAbbr);
    console.log("Selected Year:", selectedYear);

    // Convert the month abbreviation to a month number
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const selectedMonthIndex = monthAbbreviations.indexOf(selectedMonthAbbr); // This should be from 0 (Jan) to 11 (Dec)

    console.log('selectedMonthIndex-->', selectedMonthIndex);
    
    if (selectedMonthIndex === -1) {
        console.error('Invalid month abbreviation:', selectedMonthAbbr);
        return;
    }

    // Set up the dates
    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex, + 1, 0).getDate();
    const fromDate = new Date(selectedYear, selectedMonthIndex,firstDayOfMonth +1);  // First day of the selected month
    const lastDayOfMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate(); // Last day of the selected month
    const toDate = new Date(selectedYear, selectedMonthIndex, lastDayOfMonth + 1); // Last day of the selected month

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        console.error('Invalid date created', { fromDate, toDate });
        return;
    }

    console.log('From Date:', fromDate.toISOString().split('T')[0]); // YYYY-MM-DD
    console.log('To Date:', toDate.toISOString().split('T')[0]); // YYYY-MM-DD

    this.router.navigate(['/reports/get-orders'], {
        queryParams: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0],
            fromDashboard: 'true' // Add the fromDashboard parameter
        }
    });
  }

  onCustomerBarSelect(event: any): void {
    console.log("Event received from chart click:", event);

    const selectedYear = parseInt(event.name);  // Assuming this is correctly capturing the year
    const selectedMonthAbbr = event.series;  // Month abbreviation from the 'series'

    console.log("Selected Month Abbreviation:", selectedMonthAbbr);
    console.log("Selected Year:", selectedYear);

    // Convert the month abbreviation to a month number
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const selectedMonthIndex = monthAbbreviations.indexOf(selectedMonthAbbr); // This should be from 0 (Jan) to 11 (Dec)

    console.log('selectedMonthIndex-->', selectedMonthIndex);
    
    if (selectedMonthIndex === -1) {
        console.error('Invalid month abbreviation:', selectedMonthAbbr);
        return;
    }

    // Set up the dates
    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex, + 1, 0).getDate();
    const fromDate = new Date(selectedYear, selectedMonthIndex,firstDayOfMonth +1);  // First day of the selected month
    const lastDayOfMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate(); // Last day of the selected month
    const toDate = new Date(selectedYear, selectedMonthIndex, lastDayOfMonth + 1); // Last day of the selected month

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        console.error('Invalid date created', { fromDate, toDate });
        return;
    }

    console.log('From Date:', fromDate.toISOString().split('T')[0]); // YYYY-MM-DD
    console.log('To Date:', toDate.toISOString().split('T')[0]); // YYYY-MM-DD

    this.router.navigate(['/master/customer'], {
        queryParams: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0]
        }
    });
  }

  onTicketPieSelect(event: any): void {
    const segment = event.name; // Get the name of the clicked segment
    console.log('tickets segment -->', segment);
    
    // Navigate to the desired page with the segment parameter
    this.router.navigate(['/transaction/tickets'], { queryParams: { priority: segment } });
  }
  onTicketStatus(event: any): void {
    const status = event.name.toUpperCase(); // Get the name of the clicked segment
    console.log('tickets status -->', status);
    
    // Navigate to the desired page with the segment parameter
    this.router.navigate(['/transaction/tickets'], { queryParams: { status: status } });
  }

  // userLog(module: any, functionPage: any) {
  //   let params = {
  //     "module": module,
  //     "functionPage": functionPage,
  //     "type": "web"
  //   }
  //   this.userLogs.createLogs(params).subscribe((res: any) => {
  //     console.log(res);
  //   })
  // }
}
