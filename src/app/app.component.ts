import { Component, OnInit } from '@angular/core';
import {Employees} from './app.model';
import {EmployeeInfoService} from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Directory App';

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


      
    })
  }


}
