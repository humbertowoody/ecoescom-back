import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginRO } from './ro/login.ro';
import { SignupDTO } from './dto/signup.dto';
import { SignupRO } from './ro/signup.ro';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Email and/or Password wrong' })
  @ApiCreatedResponse({ description: 'Created', type: LoginRO })
  @ApiBody({ type: LoginDTO })
  @ApiOperation({
    summary: 'Get a JWT for an already-registered user',
    description:
      'Get a fresh JWT for an existing `User`. If the `User` **does not exist** or if invalid credentials are provided, a `401 Unauthorized` error will be sent.',
  })
  public postLogin(@Request() req: any): Promise<LoginRO> {
    return this.authService.login(req.user as UserEntity);
  }

  @ApiOperation({
    summary: 'Signup a new user into EcoESCOM',
    description:
      'Register a new user in EcoESCOM and send them a verification email with a URL that redirects to front-end',
  })
  @ApiBadRequestResponse({
    description: 'Validation error, check body for details',
  })
  @ApiOkResponse({ description: 'Ok', type: SignupRO })
  @ApiBody({ type: SignupDTO })
  @Post('signup')
  public postSignup(@Request() req: any): Promise<SignupRO> {
    return this.authService.signup(req.body as SignupDTO);
  }
}
