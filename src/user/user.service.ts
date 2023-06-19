import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SignupDTO } from 'src/auth/dto/signup.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super(userRepository);
  }

  public async create(signupDto: SignupDTO): Promise<UserEntity> {
    // Validate email uniqueness.
    const userWithSameEmail = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });
    if (userWithSameEmail) {
      throw new BadRequestException('Email already exists');
    }

    // Create the user.
    const user = new UserEntity();
    user.firstname = signupDto.firstname;
    user.lastname_1 = signupDto.lastname_1;
    user.lastname_2 = signupDto.lastname_2;
    user.email = signupDto.email;
    user.password = signupDto.password;
    user.role = 'STUDENT';
    user.student_id = signupDto.student_id;

    // Save the user.
    return this.userRepository.save(user);
  }

  /**
   * Find a User that matches the supplied email address.
   * @param email The email address.
   */
  public findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }
}
