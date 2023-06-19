import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

export class SignupRO {
  @ApiProperty({
    type: UserEntity,
    description: 'The User that has been created',
  })
  public user: UserEntity;

  @ApiProperty({
    type: 'string',
    description: 'The JWT used to authorize API requests',
  })
  public accessToken: string;
}
