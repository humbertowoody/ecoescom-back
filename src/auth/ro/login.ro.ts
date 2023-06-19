import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginRO {
  @ApiProperty({
    type: 'string',
    description: 'The JWT used to authorize API requests',
  })
  public readonly accessToken: string;

  @ApiProperty({
    type: (type) => UserEntity,
    description: 'The user that logged in',
  })
  public readonly user: UserEntity;
}
