import{Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Employees} from './app.model';

@Injectable()

export class EmployeeInfoService{

    private _employeeURL = 'http://localhost:8080/';

    constructor(private http:Http){}

    PullEmployeeInfo():Observable<Employees[]>{
        console.log('in services, sending the get command');
        console.log(this.http.get(this._employeeURL));
        return this.http.get(this._employeeURL).map((response) => response.json()).catch(this.handleError);
    }
    
    DelEmployee(delData):Observable<any>{
        console.log('received del data->'+ delData.email);  
        const body : any = {email: delData.email}      
        return this.http.post(this._employeeURL+'del', body).map((response) => response.json()).catch(this.handleError);
    }

    UpdateEmployee(updateData, age):Observable<any>{
        console.log( 'received in services '+ updateData.Name + 'age is->' + age)
        const body: any = {
            name : updateData.Name,
            email : updateData.Email,
            DOB : updateData.DOB,
            department: updateData.Department,
            gender : updateData.Gender,
            age: age            
        }
        return this.http.post(this._employeeURL+'update', body).map((response) => response.json()).catch(this.handleError);
    }

    CreateEmployee(createData, age): Observable<any>{
        console.log('received in services' + createData.Name + age);
        const body: any = {
            name : createData.Name,
            email : createData.Email,
            DOB : createData.DOB,
            department: createData.Department,
            gender : createData.Gender,
            age: age            
        }
        return this.http.post(this._employeeURL+'create', body).map((response) => response.json()).catch(this.handleError);        
    }

    private handleError(error: Response){
        console.log(error)
        return Observable.throw(error.json().error|| 'server error');
    }
    
}