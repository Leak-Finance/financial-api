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
import {AuthenticateCustomerResource} from "@app/security/interfaces/rest/resources/AuthenticateCustomerResource";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(CustomerRepository) private readonly customerRepository: CustomerRepository,
    @Inject(CustomerProfileRepository) private readonly customerProfileRepository: CustomerProfileRepository,
    @Inject(PasswordHashingService) private readonly passwordHashingService: PasswordHashingService,
    private readonly jwtService: JwtService,
    private readonly customerMapper: CustomerMapper,
  ) { }

  async customerLogin(
    { email, password }: AuthenticateCustomerRequest
  ): Promise<AuthenticateCustomerResponse> {

    const existingUserWithEmail = await this.customerRepository.findOneByEmail(email);

    if (existingUserWithEmail == null ||
      !(await this.passwordHashingService.compare(password, existingUserWithEmail.password))
    ) {
      return new AuthenticateCustomerResponse('Email or password is incorrect');
    }

    const resource = new AuthenticateCustomerResource();
    resource.id = existingUserWithEmail.id;
    resource.email = existingUserWithEmail.email;

    resource.profile = await this.customerProfileRepository.findByCustomerId(resource.id);

    const payload = { id: resource.id, username: resource.email };
    resource.token = this.jwtService.sign(payload, { secret: "ABxña12Ñh!^,;!" });

    return new AuthenticateCustomerResponse(resource);
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