import { Component, OnInit } from '@angular/core';
import{NgForm} from '@angular/forms';
import {Employees} from './app.model';
import {EmployeeInfoService} from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Directory App';
  employeeName:string;
  employeeEmail:string;
  employeeDOB:any;
  employeeDepartment:string;
  employeeGender:string;
  employeeAge:number;
  employees:Employees[];
  errorMessage: string;

  constructor(private employeesinfo: EmployeeInfoService){}

  ngOnInit(): void{
    console.log('sending the request');
    this.employeesinfo.PullEmployeeInfo().subscribe((data) =>{
      console.log('data is->'+ data[0].name );
      this.employees = data,
      (err) => this.errorMessage = err;
      console.log(this.employees[0].name);      
    }); 
    
  }

  editInfo(rowData: any): void{
    console.log('event works '+ rowData.name);
    this.employeeName = rowData.name;
    this.employeeEmail = rowData.email;
    this.employeeDOB = rowData.DOB;
    this.employeeDepartment = rowData.department;
    this.employeeGender = rowData.gender;
    this.employeeAge = this.calAge(rowData.DOB);
  }

  CreateEmployee(form: NgForm){    
    this.employeeAge = this.calAge(form.value.DOB);
    console.log(this.employeeAge);
    this.employeesinfo.CreateEmployee(form.value, this.employeeAge).subscribe((data) => {
      console.log('created a new entry'+ data)
    })

  }

  

  calAge(dob) {
    var  birthday = new Date(dob);
    var today = new Date();
    var thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - thisYear;
    console.log('age is ->' + age)
    return age;
}
 

 

  delInfo(delData:any):void{
    console.log('deleting data->'+ delData);
    this.employeesinfo.DelEmployee(delData).subscribe((response) => {
      console.log('response is -> ' + response);
    })    
  }
  UpdateInfo(data: NgForm) {
    console.log('update info is -> '+data.value.Email);  
    
    this.employeesinfo.UpdateEmployee(data.value, this.employeeAge).subscribe((response) =>{
      console.log('response from post request is ->' + response);
    });
  }


}
