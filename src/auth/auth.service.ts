import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginRO } from './ro/login.ro';
import { SignupDTO } from './dto/signup.dto';
import { SignupRO } from './ro/signup.ro';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Perform a user validation.
   * @param email The email address to validate
   * @param password The password to validate
   */
  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  /**
   * Get the JWT token for an already-validated User.
   * @param user The User Entity that has been validated.
   */
  public async login(user: UserEntity): Promise<LoginRO> {
    const accessToken: string = await this.jwtService.signAsync({
      sub: user.id,
    });

    // Delete sensitive fields.
    delete user.password;

    return {
      user,
      accessToken,
    };
  }

  /**
   * Signup operation for Users.
   * @param signupDto The Signup information to create a new User.
   */
  public async signup(signupDto: SignupDTO): Promise<SignupRO> {
    // Create the user.
    const user: UserEntity = await this.userService.create(signupDto);

    // The payload for the JWT.
    const payload = { sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
