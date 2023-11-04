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
  async signUp(@Body() registerCustomerRequest: RegisterCustomerRequest) {
    const result = await this.authService.customerRegister(registerCustomerRequest);

    if (!result.success) {
      throw new BadRequestException([result.message]);
    }

    return result.resource;
  }

  @Post('customers/sign-in')
  @ApiOperation({ summary: 'Login to an existing account and get JWT.' })
  @ApiBody({
    type: AuthenticateCustomerRequest,
    description: 'Data to authenticate an existing user',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials. Authentication failed.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully.',
    type: AuthenticateCustomerResource,
  })
  async signIn(@Body() authenticateRequest: AuthenticateCustomerRequest) {
    const result = await this.authService.customerLogin(authenticateRequest);

    if (!result.success) {
      throw new UnauthorizedException([result.message]);
    }

    return result.resource;
  }
}
