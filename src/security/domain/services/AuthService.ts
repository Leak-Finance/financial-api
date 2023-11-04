import {AuthenticateCustomerRequest} from "@app/security/domain/services/communication/AuthenticateCustomerRequest";
import {AuthenticateCustomerResponse} from "@app/security/domain/services/communication/AuthenticateCustomerResponse";
import {RegisterCustomerRequest} from "@app/security/domain/services/communication/RegisterCustomerRequest";
import {RegisterCustomerResponse} from "@app/security/domain/services/communication/RegisterCustomerResponse";

export interface AuthService {
  customerRegister(request: RegisterCustomerRequest): Promise<RegisterCustomerResponse>;
  customerLogin(request: AuthenticateCustomerRequest): Promise<AuthenticateCustomerResponse>;
}

export const AuthService = Symbol("AuthService");