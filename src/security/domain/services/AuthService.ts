import {AuthenticateCustomerRequest} from "@app/security/domain/services/communication/AuthenticateCustomerRequest";
import {AuthenticateCustomerResponse} from "@app/security/domain/services/communication/AuthenticateCustomerResponse";
import {RegisterCustomerRequest} from "@app/security/domain/services/communication/RegisterCustomerRequest";
import {RegisterCustomerResponse} from "@app/security/domain/services/communication/RegisterCustomerResponse";
import {RegisterEmployeeRequest} from "@app/security/domain/services/communication/RegisterEmployeeRequest";
import {RegisterEmployeeResponse} from "@app/security/domain/services/communication/RegisterEmployeeResponse";
import {AuthenticateEmployeeRequest} from "@app/security/domain/services/communication/AuthenticateEmployeeRequest";
import {AuthenticateEmployeeResponse} from "@app/security/domain/services/communication/AuthenticateEmployeeResponse";

export interface AuthService {
  customerRegister(request: RegisterCustomerRequest): Promise<RegisterCustomerResponse>;
  employeeRegister(request: RegisterEmployeeRequest): Promise<RegisterEmployeeResponse>;
  customerLogin(request: AuthenticateCustomerRequest): Promise<AuthenticateCustomerResponse>;
  employeeLogin(request: AuthenticateEmployeeRequest): Promise<AuthenticateEmployeeResponse>;
}

export const AuthService = Symbol("AuthService");