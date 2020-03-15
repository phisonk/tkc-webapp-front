import { Component, OnInit,ViewChild } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as Chartist from 'chartist';
export interface PeriodicElement {
  name: string;
  description: string;
  status: boolean;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  upSensor :number;
  downSensor:number;
  
  displayedColumns: string[] = ['name', 'description', 'status', 'value'];
  deviceList: AngularFireList<any>;
  devices: any[];
  dataSource = new MatTableDataSource();
  
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  constructor(private db: AngularFireDatabase) { 
    this.deviceList = db.list('/Devices')
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
  };

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.deviceList.snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      })).subscribe(items => {
      this.devices = items;
      console.log(this.devices)
      this.dataSource.data  = this.devices.map(a => a.value);
      console.log(this.dataSource.data)
      this.length = this.dataSource.data.length;
      let dataTemp = JSON.parse(JSON.stringify(this.dataSource.data));
    
    const groupByValue = dataTemp.reduce((acc, it) => {
      acc[it['value']] = acc[it['value']] + 1 || 1;
      return acc;
    }, {});
    console.log(groupByValue)
    let valueData = Object.entries(JSON.parse(JSON.stringify(groupByValue)));
    console.log(valueData)
    const dataDailySalesChart: any = {
      labels: valueData.map(a=>a[0]),
      series: [
        valueData.map(a=>a[1])
      ]
    };
    console.log(dataDailySalesChart)
    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const groupByStatus = dataTemp.reduce((acc, it) => {
      acc[it['status']] = acc[it['status']] + 1 || 1;
      return acc;
    }, {});
    console.log(groupByStatus)
    let statusData = Object.entries(JSON.parse(JSON.stringify(groupByStatus)));
    console.log(statusData)
    this.upSensor = Number(statusData[0][1]);
    this.downSensor = Number(statusData[1][1]);
    var datawebsiteViewsChart = {
      labels: ['On','Off'],
      series: [
        statusData.map(a=>Number(a[1]))

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 20,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);

    });
  }



  addDevice(data:NgForm){
    console.log(data.value)
    this.deviceList.push(data.value);
  }


}
