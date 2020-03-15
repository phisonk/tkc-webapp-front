import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addsensor',
  templateUrl: './addsensor.component.html',
  styleUrls: ['./addsensor.component.css']
})
export class AddsensorComponent implements OnInit {
  deviceList: AngularFireList<any>;
  isAdd: boolean = false;

  constructor(private db: AngularFireDatabase) { 
    this.deviceList = db.list('/Devices')
  }

  ngOnInit(): void {
  }

  addDevice(data:NgForm){
    console.log(data.value)
    this.deviceList.push(data.value);
    this.isAdd = true;
  }

}
