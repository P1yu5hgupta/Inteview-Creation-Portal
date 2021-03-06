import { Component, OnInit, ɵConsole } from '@angular/core';
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
  newStartTime= new FormControl('', [Validators.required]);
  newEndTime= new FormControl('', [Validators.required]);
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
    if(this.newStartTime.valid && this.newEndTime.valid){
      console.log(this.newStartTime);
      this.apiService.updateInterview(this.updatingschedule._id,this.updatingschedule.email,this.newStartTime.value,this.newEndTime.value).subscribe(res=>{
        if(res.status){
          alert(res.message);
          this.router.navigate(['/']);
        }
        else
          alert(res.message);
      })
    }
  }
}
