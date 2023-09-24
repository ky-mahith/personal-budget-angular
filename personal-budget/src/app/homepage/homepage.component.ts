// import { Component, OnInit } from '@angular/core';
// import { HttpClient} from '@angular/common/http';

// import Chart from 'chart.js/auto';

// @Component({
//   selector: 'pb-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.scss']
// })
// export class HomepageComponent implements OnInit {

//   public dataSource : any = {
//     datasets: [
//         {
//             data: [],
//             backgroundColor: [
//                 '#ffcd56',
//                 '#ff6384',
//                 '#36a2eb',

//             ],
//         }
//     ],
//     labels: []
//   };


//   constructor(private http: HttpClient) { }

//   ngOnInit(): void{
//     this.http.get('http://localhost:3000/budget');
//     .subscribe((res : any) => {
//       for (var i = 0; i < res.data.myBudget.length; i++) {
//         this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
//         this.dataSource.labels[i] = res.data.myBudget[i].title;
//         }

//     this.createChart();
//     });
//   }

//   createChart() {
//     const ctx = <HTMLCanvasElement> document.getElementById('myChart');
//     var myPieChart = new Chart(ctx, {
//       type: "pie",
//       data: this.dataSource,
//     });
//   }

// }




import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{

  public dataSource : any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
                            '#ffcd56',
                            '#ff6384',
                            '#562726',
                            '#3DE000',
                            "#DAFF33",
                            "#33FFEC",
                            "#3371FF",
                            "#4D0F92",
        ],
      },
    ],
    labels: [],
  };

  public newDataSource : any = [];

  constructor(private http:HttpClient){

  }

  ngAfterViewInit(): void{
    this.http.get('http://localhost:3000/budget')
    .subscribe((res : any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

        this.newDataSource.push({
          "title": res.myBudget[i].title,
          "budget": res.myBudget[i].budget,
        });
      }
      console.log(this.newDataSource);
      this.createChart();
      // change(this.newDataSource);
    });
  }

  createChart() {
    const ctx = <HTMLCanvasElement> document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: this.dataSource,
    });
  }



}
