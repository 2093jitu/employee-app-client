import { GradeModel } from "./grade.model";

export class EmployeeModel{

    id: number;
	empId: string;
	empName: string;
	address: string;
	mobile: string;
	grade: GradeModel = new GradeModel();
    
}