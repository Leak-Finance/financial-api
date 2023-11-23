import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Customer } from "@app/security/domain/model/Customer.entity";
import { AuthServiceImpl } from "@app/security/application/internal/AuthServiceImpl.service";
import { AuthController } from "@app/security/interfaces/rest/AuthController";
import { AuthService } from "@app/security/domain/services/AuthService";
import { PasswordHashingService } from "@app/security/domain/services/PasswordHashingService";
import { PasswordHashingServiceImpl } from "@app/security/application/internal/PasswordHashingImpl.service";
import { CustomerProfile } from "@app/security/domain/model/CustomerProfile.entity";
import { CustomerMapper } from "@app/security/interfaces/rest/mapper/CustomerMapper";
import { CustomerRepositoryImpl } from "@app/security/infrastructure/repositories/CustomerRepositoryImpl";
import { CustomerRepository } from "@app/security/domain/persistence/CustomerRepository";
import { CustomerProfileRepository } from "@app/security/domain/persistence/CustomerProfileRepository";
import { CustomerProfileRepositoryImpl } from "@app/security/infrastructure/repositories/CustomerProfileRepositoryImpl";
import { JwtService } from "@nestjs/jwt";
import { EmployeeRepository } from "@app/security/domain/persistence/EmployeeRepository";
import { EmployeeRepositoryImpl } from "@app/security/infrastructure/repositories/EmployeeRepositoryImpl";
import { EmployeeProfileRepository } from "@app/security/domain/persistence/EmployeeProfileRepository";
import { EmployeeProfileRepositoryImpl } from "@app/security/infrastructure/repositories/EmployeeProfileRepositoryImpl";
import { EmployeeMapper } from "@app/security/interfaces/rest/mapper/EmployeeMapper";
import { EmployeeProfile } from "@app/security/domain/model/EmployeeProfile.entity";
import { Employee } from "@app/security/domain/model/Employee.entity";
import { TenantRepository } from "@app/security/domain/persistence/TenantRepository";
import { TenantRepositoryImpl } from "@app/security/infrastructure/repositories/TenantRepositoryImpl";
import { Tenant } from "@app/security/domain/model/Tenant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerProfile, Employee, EmployeeProfile, Tenant])],
  providers: [
    CustomerMapper,
    EmployeeMapper,
    JwtService,
    {
      provide: CustomerProfileRepository,
      useClass: CustomerProfileRepositoryImpl,
    },
    {
      provide: CustomerRepository,
      useClass: CustomerRepositoryImpl,
    },
    {
      provide: EmployeeProfileRepository,
      useClass: EmployeeProfileRepositoryImpl,
    },
    {
      provide: TenantRepository,
      useClass: TenantRepositoryImpl,
    },
    {
      provide: EmployeeRepository,
      useClass: EmployeeRepositoryImpl,
    },
    {
      provide: PasswordHashingService,
      useClass: PasswordHashingServiceImpl,
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class SecurityModule {}
