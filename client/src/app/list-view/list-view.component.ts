import { Component, OnInit } from '@angular/core';
import { Schedule } from "../schemas/schedule";
import { ApiServices } from "../services/apiService";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  scheduleList: Schedule[];
  updating: Boolean=false;
  updatingschedule:Schedule;
  startTime= new FormControl('', [Validators.required]);
  endTime= new FormControl('', [Validators.required]);
  isSubmitted: boolean=false;
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
  update(sch){
    this.updating=!this.updating;
    this.updatingschedule=sch;
  }
  updateSchedule(){
    this.isSubmitted=true;
    if(this.startTime.valid && this.endTime.valid){
      // this.apiService.updateInterview(this.updatingschedule._id,this.updatingschedule.email, this.startTime ,this.endTime).subscribe(res=>{
      //   console.log(res);
      // })
      console.log(this.updatingschedule);
      this.router.navigate(['/']);
    }
  }
}
