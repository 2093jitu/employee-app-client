import { EmployeeModel } from "./employee.model";

export class EmpAccModel{

    id: number;
	type: string;
	accName: string;
	accNumber: string;
	bankName: string;
	branchName: string;
	balance: number;
    employee: EmployeeModel = new EmployeeModel();
    
}