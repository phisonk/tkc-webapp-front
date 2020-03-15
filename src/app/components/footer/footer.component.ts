import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  date : Date = new Date();
  
  constructor() {setInterval(() => {
    this.date = new Date()
  }, 1000)
  }

  ngOnInit() {
  }

}
