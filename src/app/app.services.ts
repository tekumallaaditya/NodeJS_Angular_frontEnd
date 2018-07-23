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
    private handleError(error: Response){
        return Observable.throw(error.json().error || 'server error');
    }
    
}