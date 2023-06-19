import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Perform a Local Strategy validation.
   * @param username The email to be validated
   * @param password The password to be validated
   */
  async validate(username: string, password: string): Promise<any> {
    Logger.log(`Validating email: ${username}`, 'LocalStrategy');
    const user: UserEntity = await this.authService.validateUser(
      username,
      password,
    );
    Logger.log(`Found user: ${JSON.stringify(user)}`, 'LocalStrategy');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
