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
import * as d3 from 'd3';

import axios from 'axios';




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
      //this.createChartD3js();
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

  // createChartD3js() {
  //   const svg:any = d3.select("#pie-chart").append("svg").append("g");

  //     svg.append("g").attr("class", "slices");
  //     svg.append("g").attr("class", "labels");
  //     svg.append("g").attr("class", "lines");

  //     var width = 650,
  //       height = 300,
  //       radius = Math.min(width, height) / 2;

  //     // var pie = d3.layout
  //     //   .pie()
  //     //   .sort(null)
  //     //   .value(function (d:any) {
  //     //     return d.budget;
  //     //   });

  //     var arc = d3.svg
  //       d3.arc()
  //       .outerRadius(radius * 0.8)
  //       .innerRadius(radius * 0.4);

  //     var outerArc = d3.svg
  //       d3.arc()
  //       .innerRadius(radius * 0.9)
  //       .outerRadius(radius * 0.9);

  //     svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //     var key = function (d:any) {
  //       return d.data.title;
  //     };

  //       var titles:any = []
  //       var getTitles = ()=>{
  //           axios.get("/budget").then(function (res : any) {
  //               for(var i=0;i<res.data.myBudget.length;i++){
  //                   titles.push(res.data.myBudget[i].title)
  //               }
  //           })
  //       }
  //       getTitles();

  //       // var color = d3.scale
  //       //     .ordinal()
  //       //     .domain(titles)
  //       //     .range([
  //       //             '#ffcd56',
  //       //             '#ff6384',
  //       //             '#562726',
  //       //             '#3DE000',
  //       //             "#DAFF33",
  //       //             "#33FFEC",
  //       //             "#3371FF",
  //       //             "#4D0F92",
  //       //     ]);



  //           let change =function() {
  //             /* ------- PIE SLICES -------*/
  //             var slice = svg
  //               .select(".slices")
  //               .selectAll("path.slice")
  //               // .data(pie(), key);

  //             slice
  //               .enter()
  //               .insert("path")
  //               .style("fill", function (d:any) {
  //                 return d3.color(d.data.title);
  //               })
  //               .attr("class", "slice");

  //             // slice
  //             //   .transition()
  //             //   .duration(1000)
  //             //   .attrTween("d", function (d:any) {
  //             //     this._current = this._current || d;
  //             //     var interpolate = d3.interpolate(this._current, d);
  //             //     this._current = interpolate(0);
  //             //     return function (t:any) {
  //             //       return arc(interpolate(t));
  //             //     };
  //             //   });

  //             slice.exit().remove();

  //             /* ------- TEXT LABELS -------*/

  //             var text = svg.select(".labels").selectAll("text").data(d3.pie(), key);

  //             text
  //               .enter()
  //               .append("text")
  //               .attr("dy", ".35em")
  //               .text(function (d:any) {
  //                 return d.data.title;
  //               });

  //             function midAngle(d:any) {
  //               return d.startAngle + (d.endAngle - d.startAngle) / 2;
  //             }

  //             // text
  //             //   .transition()
  //             //   .duration(1000)
  //             //   .attrTween("transform", function (d:any) {
  //             //     this._current = this._current || d;
  //             //     var interpolate = d3.interpolate(this._current, d);
  //             //     this._current = interpolate(0);
  //             //     return function (t:any) {
  //             //       var d2 = interpolate(t);
  //             //       var pos = outerArc.centroid(d2);
  //             //       pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
  //             //       return "translate(" + pos + ")";
  //             //     };
  //             //   })
  //             //   .styleTween("text-anchor", function (d:any) {
  //             //     this._current = this._current || d;
  //             //     var interpolate = d3.interpolate(this._current, d);
  //             //     this._current = interpolate(0);
  //             //     return function (t:any) {
  //             //       var d2 = interpolate(t);
  //             //       return midAngle(d2) < Math.PI ? "start" : "end";
  //             //     };
  //             //   });

  //             text.exit().remove();

  //             /* ------- SLICE TO TEXT POLYLINES -------*/

  //             var polyline = svg
  //               .select(".lines")
  //               .selectAll("polyline")
  //               // .data(pie(), key);

  //             polyline.enter().append("polyline");

  //             // polyline
  //             //   .transition()
  //             //   .duration(1000)
  //             //   .attrTween("points", function (d:any) {
  //             //     this._current = this._current || d;
  //             //     var interpolate = d3.interpolate(this._current, d);
  //             //     this._current = interpolate(0);
  //             //     return function (t:any) {
  //             //       var d2 = interpolate(t);
  //             //       var pos = outerArc.centroid(d2);
  //             //       pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
  //             //       return [arc.centroid(d2), outerArc.centroid(d2), pos];
  //             //     };
  //             //   });

  //             // polyline.exit().remove();
  //           }

  //           change();





  // }





















}
