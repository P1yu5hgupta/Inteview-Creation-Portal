import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { ApiServices } from "../services/apiService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {
  email= new FormControl('', [  
    Validators.required,
    Validators.minLength(5),  
    Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9-.]+$")
  ]);
  startTime= new FormControl('', [Validators.required]);
  endTime= new FormControl('', [Validators.required]);
  
  isSubmitted:boolean=false;
  constructor(private formBuilder: FormBuilder , private apiService: ApiServices ,private router: Router) { }

  ngOnInit(): void {
  }
  scheduleInterview(){
    this.isSubmitted=true;
    if(this.email.valid){
      this.apiService.createInterview(this.email.value,this.startTime.value,this.endTime.value).subscribe(
        res=>{
          if(!res.status){
            if(res.message=="Slot not Available"){
              alert("Slot Not Available");
            }
            else{
              alert("Error while Scheduling Interview");
            }
          }
          else{
            alert("Interview Scheduled Successfully");
            this.router.navigate(['/']);
          }
        }
      )
    }
  }
}
