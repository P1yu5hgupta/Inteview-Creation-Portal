import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  url:string = "http://localhost:4000/getAllSchedule";
  constructor(private http : HttpClientModule) {

    // this.http.get(this.url).toPromise().then(data =>{
    //   console.log(data);
    // })
  }

  ngOnInit(): void {
  }

}
