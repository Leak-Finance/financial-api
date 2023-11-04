import {Public} from "@app/shared/infrastructure/decorator/public.decorator";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {BadRequestException, Body, Controller, HttpStatus, Inject, Post, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "@app/security/domain/services/AuthService";
import {RegisterCustomerRequest} from "@app/security/domain/services/communication/RegisterCustomerRequest";
import {CustomerResource} from "@app/security/interfaces/rest/resources/CustomerResource";
import {AuthenticateCustomerRequest} from "@app/security/domain/services/communication/AuthenticateCustomerRequest";
import {AuthenticateCustomerResource} from "@app/security/interfaces/rest/resources/AuthenticateCustomerResource";
import {RegisterEmployeeRequest} from "@app/security/domain/services/communication/RegisterEmployeeRequest";
import {EmployeeResource} from "@app/security/interfaces/rest/resources/EmployeeResource";
import {AuthenticateEmployeeRequest} from "@app/security/domain/services/communication/AuthenticateEmployeeRequest";

@Public()
@ApiTags('Auth')
@Controller('api/v1/security/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('customers/sign-up')
  @ApiOperation({ summary: 'Register new customers.' })
  @ApiBody({
    type: RegisterCustomerRequest,
    description: 'Data to register a new customer',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer registered successfully.',
    type: CustomerResource,
  })
  async customerSignUp(@Body() registerCustomerRequest: RegisterCustomerRequest) {
    const result = await this.authService.customerRegister(registerCustomerRequest);

    if (!result.success) {
      throw new BadRequestException([result.message]);
    }

    return result.resource;
  }

  @Post('employees/sign-up')
  @ApiOperation({ summary: 'Register new employee.' })
  @ApiBody({
    type: RegisterEmployeeRequest,
    description: 'Data to register a new employee',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Employee registered successfully.',
    type: EmployeeResource,
  })
  async employeeSignUp(@Body() registerEmployeeRequest: RegisterEmployeeRequest) {
    const result = await this.authService.employeeRegister(registerEmployeeRequest);

    if (!result.success) {
      throw new BadRequestException([result.message]);
    }

    return result.resource;
  }


  @Post('customers/sign-in')
  @ApiOperation({ summary: 'Login to an existing customer account and get JWT.' })
  @ApiBody({
    type: AuthenticateCustomerRequest,
    description: 'Data to authenticate an existing customer',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials. Authentication failed.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer authenticated successfully.',
    type: AuthenticateCustomerResource,
  })
  async customerSignIn(@Body() authenticateRequest: AuthenticateCustomerRequest) {
    const result = await this.authService.customerLogin(authenticateRequest);

    if (!result.success) {
      throw new UnauthorizedException([result.message]);
    }

    return result.resource;
  }

  @Post('employees/sign-in')
  @ApiOperation({ summary: 'Login to an existing employee account and get JWT.' })
  @ApiBody({
    type: AuthenticateEmployeeRequest,
    description: 'Data to authenticate an existing employee',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials. Authentication failed.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee authenticated successfully.',
    type: AuthenticateCustomerResource,
  })
  async employeeSignIn(@Body() authenticateRequest: AuthenticateEmployeeRequest) {
    const result = await this.authService.employeeLogin(authenticateRequest);

    if (!result.success) {
      throw new UnauthorizedException([result.message]);
    }

    return result.resource;
  }
}
