import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {Customer} from "@app/security/domain/model/Customer.entity";
import {AuthServiceImpl} from "@app/security/application/internal/AuthServiceImpl.service";
import {AuthController} from "@app/security/interfaces/rest/AuthController";
import {AuthService} from "@app/security/domain/services/AuthService";
import {PasswordHashingService} from "@app/security/domain/services/PasswordHashingService";
import {PasswordHashingServiceImpl} from "@app/security/application/internal/PasswordHashingImpl.service";
import {CustomerProfile} from "@app/security/domain/model/CustomerProfile.entity";
import {CustomerMapper} from "@app/security/interfaces/rest/mapper/CustomerMapper";
import {CustomerRepositoryImpl} from "@app/security/infrastructure/repositories/CustomerRepositoryImpl";
import {CustomerRepository} from "@app/security/domain/persistence/CustomerRepository";
import {CustomerProfileRepository} from "@app/security/domain/persistence/CustomerProfileRepository";
import {CustomerProfileRepositoryImpl} from "@app/security/infrastructure/repositories/CustomerProfileRepositoryImpl";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerProfile])],
  providers: [
    JwtService,
    {
      provide: CustomerProfileRepository,
      useClass: CustomerProfileRepositoryImpl
    },
    {
      provide: CustomerRepository,
      useClass: CustomerRepositoryImpl
    },
    CustomerMapper,
    {
      provide: PasswordHashingService,
      useClass: PasswordHashingServiceImpl
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