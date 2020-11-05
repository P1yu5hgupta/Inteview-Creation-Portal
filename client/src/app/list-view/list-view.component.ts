import { Component, OnInit } from '@angular/core';
import { Schedule } from "../schemas/schedule";
import { ApiServices } from "../services/apiService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  scheduleList: Schedule[];
  constructor(private apiService: ApiServices,private router: Router) {
    this.apiService.listInterviews().subscribe(res =>{
      this.scheduleList=res;
      this.scheduleList.forEach(element => {
        element.endTime=new Date(element.endTime);
        element.startTime= new Date(element.startTime);
      });
    })
  }

  ngOnInit(): void {
  }

  deleteSchedule(sch){
    console.log(sch);
    this.apiService.deleteInterview(sch._id).subscribe(res=>{
      if(res.status){
        alert(res.message);
        this.router.navigate(['/createInterview']);
      }
    })
  }
}
