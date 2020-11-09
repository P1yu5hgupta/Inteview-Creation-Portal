import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiServices{
    baseUrl:string ="http://localhost:4000/";
    // baseUrl:string ="https://interview-creation-backendapi.herokuapp.com/";
    constructor(private http : HttpClient) { }
    listInterviews(): Observable<any>{
        return this.http.get(this.baseUrl+"getAllSchedule");
    }

    createInterview(email:string,startTime: Date, endTime: Date): Observable<any>{
        return this.http.post(this.baseUrl+"create", {"email": email,"startTime": startTime,"endTime": endTime});
    }

    deleteInterview(_id:string): Observable<any>{
        return this.http.post(this.baseUrl+"delete", {"_id": _id,});
    }

    updateInterview(_id: string,email:string,newStartTime:Date, newEndTime:Date): Observable<any>{
        return this.http.post(this.baseUrl+"update", {"_id": _id,"email": email,"newStartTime": newStartTime,"newEndTime": newEndTime});
    }
}