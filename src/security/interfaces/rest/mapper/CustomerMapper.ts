import {Injectable} from "@nestjs/common";
import {Customer} from "@app/security/domain/model/Customer.entity";
import {CustomerResource} from "@app/security/interfaces/rest/resources/CustomerResource";

@Injectable()
export class CustomerMapper {

  toResource(customer: Customer): CustomerResource {
    return {
      id: customer.id,
      email: customer.email,
    } as CustomerResource;
  }
}