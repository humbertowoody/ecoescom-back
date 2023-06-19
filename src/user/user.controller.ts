import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
      disabled: true,
    },
  },
  query: {
    exclude: [
      'password',
      'passwordResetToken',
      'passwordResetTokenExpiration',
      'verificationToken',
    ],
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
  },
  dto: {
    update: UpdateUserDTO,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => ({ id: user.id }),
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
