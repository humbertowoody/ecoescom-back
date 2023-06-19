import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<any> {
    try {
      // Find the user based on the JWT payload.
      const foundUser: UserEntity = await this.userService.findOne({
        where: { id: payload.sub },
      });

      // If the user doesn't exist, throw an unauthorized exception.
      if (!foundUser) {
        throw new UnauthorizedException();
      }

      // Otherwise, return the user.
      return foundUser;
    } catch (err) {
      // If the user doesn't exist, throw an unauthorized exception.d
      Logger.error(`Error while validating JWT: ${err}`);
      throw new UnauthorizedException();
    }
  }
}
