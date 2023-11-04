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
import {RegisterEmployeeRequest} from "@app/security/domain/services/communication/RegisterEmployeeRequest";
import {RegisterEmployeeResponse} from "@app/security/domain/services/communication/RegisterEmployeeResponse";
import {EmployeeRepository} from "@app/security/domain/persistence/EmployeeRepository";
import {Employee} from "@app/security/domain/model/Employee.entity";
import {EmployeeProfile} from "@app/security/domain/model/EmployeeProfile.entity";
import {EmployeeProfileRepository} from "@app/security/domain/persistence/EmployeeProfileRepository";
import {EmployeeMapper} from "@app/security/interfaces/rest/mapper/EmployeeMapper";
import {TenantRepository} from "@app/security/domain/persistence/TenantRepository";
import {Tenant} from "@app/security/domain/model/Tenant.entity";
import {AuthenticateEmployeeRequest} from "@app/security/domain/services/communication/AuthenticateEmployeeRequest";
import {AuthenticateEmployeeResponse} from "@app/security/domain/services/communication/AuthenticateEmployeeResponse";
import {AuthenticateEmployeeResource} from "@app/security/interfaces/rest/resources/AuthenticateEmployeeResource";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(CustomerRepository) private readonly customerRepository: CustomerRepository,
    @Inject(CustomerProfileRepository) private readonly customerProfileRepository: CustomerProfileRepository,
    @Inject(EmployeeRepository) private readonly employeeRepository: EmployeeRepository,
    @Inject(EmployeeProfileRepository) private readonly employeeProfileRepository: EmployeeProfileRepository,
    @Inject(TenantRepository) private readonly tenantRepository: TenantRepository,
    @Inject(PasswordHashingService) private readonly passwordHashingService: PasswordHashingService,
    private readonly jwtService: JwtService,
    private readonly customerMapper: CustomerMapper,
    private readonly employeeMapper: EmployeeMapper,
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

  async employeeRegister(
    { firstName, lastName, username, password }: RegisterEmployeeRequest
  ): Promise<RegisterEmployeeResponse> {

    if (await this.employeeRepository.existsByUsername(username)) {
      return new RegisterEmployeeResponse(`Username "${username}" is already in use.`);
    }

    const hashedPassword = await this.passwordHashingService.hash(password);

    const newEmployee = new Employee();
    newEmployee.username = username;
    newEmployee.password = hashedPassword;

    let tenant = await this.tenantRepository.findOneById(1);

    // TODO: ADD SEEDER FILE (https://izolabs.tech/2022/06/create-nestjs-seeders)
    if (tenant == null) {
      const defaultTenant = new Tenant();

      defaultTenant.email = "leak-finance@mail.com";
      defaultTenant.phoneNumber = "+51 987 654 321";
      defaultTenant.ruc = "10164121611";
      defaultTenant.name = "Leak Finance";
      defaultTenant.logoUrl = "https://marketplace.canva.com/EAFpJLtm2rU/1/0/1600w/canva-colorful-abstract-financial-investment-free-logo-sNx5L8kDRt0.jpg";

      tenant = await this.tenantRepository.persist(defaultTenant);
    }

    newEmployee.tenant = tenant;

    try {

      const savedEmployee = await this.employeeRepository.persist(newEmployee);
      const linkedEmployeeProfile = new EmployeeProfile();

      linkedEmployeeProfile.employeeId = savedEmployee.id;
      linkedEmployeeProfile.firstName = firstName;
      linkedEmployeeProfile.lastName = lastName;

      await this.employeeProfileRepository.persist(linkedEmployeeProfile);

      return new RegisterEmployeeResponse(this.employeeMapper.toResource(savedEmployee));
    }
    catch (e) {
      return new RegisterEmployeeResponse('An error occurred while registering the employee.');
    }
  }

  async employeeLogin(
    { username, password }: AuthenticateEmployeeRequest
  ): Promise<AuthenticateEmployeeResponse>  {

    const existingEmployeeWithUsername = await this.employeeRepository.findOneByUsername(username);

    if (existingEmployeeWithUsername == null ||
      !(await this.passwordHashingService.compare(password, existingEmployeeWithUsername.password))
    ) {
      return new AuthenticateEmployeeResponse('Email or password is incorrect');
    }

    const resource = new AuthenticateEmployeeResource();
    resource.id = existingEmployeeWithUsername.id;
    resource.username = existingEmployeeWithUsername.username;

    resource.profile = await this.employeeProfileRepository.findByEmployeeId(resource.id);

    const payload = { id: resource.id, username: resource.username };
    resource.token = this.jwtService.sign(payload, { secret: "ABxña12Ñh!^,;!" });

    return new AuthenticateEmployeeResponse(resource);

  }
}