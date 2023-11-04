import {AuthService} from "@app/security/domain/services/AuthService";
import {Inject, Injectable} from "@nestjs/common";
import {AuthenticateCustomerRequest} from "@app/security/domain/services/communication/AuthenticateCustomerRequest";
import {AuthenticateCustomerResponse} from "@app/security/domain/services/communication/AuthenticateCustomerResponse";
import {RegisterCustomerRequest} from "@app/security/domain/services/communication/RegisterCustomerRequest";
import {RegisterCustomerResponse} from "@app/security/domain/services/communication/RegisterCustomerResponse";
import {CustomerRepository} from "@app/security/domain/persistence/CustomerRepository";
import {PasswordHashingService} from "@app/security/domain/services/PasswordHashingService";
import {Customer} from "@app/security/domain/model/Customer.entity";
import {CustomerProfile} from "@app/security/domain/model/CustomerProfile.entity";
import {CustomerProfileRepository} from "@app/security/domain/persistence/CustomerProfileRepository";
import {CustomerMapper} from "@app/security/interfaces/rest/mapper/CustomerMapper";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(CustomerRepository) private readonly customerRepository: CustomerRepository,
    @Inject(CustomerProfileRepository) private readonly customerProfileRepository: CustomerProfileRepository,
    @Inject(PasswordHashingService) private readonly passwordHashingService: PasswordHashingService,
    private readonly customerMapper: CustomerMapper,
  ) { }

  customerLogin(request: AuthenticateCustomerRequest): Promise<AuthenticateCustomerResponse> {
    return Promise.resolve(undefined);
  }

  async customerRegister(
    { firstName, lastName, email, dni, phoneNumber, password } : RegisterCustomerRequest
  ): Promise<RegisterCustomerResponse> {

    if (await this.customerRepository.existsByEmail(email)) {
      return new RegisterCustomerResponse(`Email address "${email}" is already in use.`);
    }

    const hashedPassword = await this.passwordHashingService.hash(password);

    const newCustomer = new Customer();
    newCustomer.email = email;
    newCustomer.password = hashedPassword;

    try {

      const savedCustomer = await this.customerRepository.persist(newCustomer);
      const linkedCustomerProfile = new CustomerProfile();

      linkedCustomerProfile.dni = dni;
      linkedCustomerProfile.phoneNumber = phoneNumber;
      linkedCustomerProfile.firstName = firstName;
      linkedCustomerProfile.lastName = lastName;
      linkedCustomerProfile.customerId = savedCustomer.id;

      await this.customerProfileRepository.persist(linkedCustomerProfile);

      return new RegisterCustomerResponse(this.customerMapper.toResource(savedCustomer));
    }
    catch (e) {
      return new RegisterCustomerResponse('An error occurred while registering the customer.');
    }
  }

}