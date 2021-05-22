import { CompanyAccountModel } from "./company-account.model";
import { EmpAccModel } from "./emp-acc.model";
import { GradeModel } from "./grade.model";

export class TransactionModel {


	id: number;
	des: string;
	crAmount: number;
	drAmount: number;
	comAccount: CompanyAccountModel;
	empAccount: EmpAccModel;
}