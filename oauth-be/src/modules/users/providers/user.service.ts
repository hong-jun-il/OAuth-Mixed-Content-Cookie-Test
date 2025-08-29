import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/common/dto/01_user.dto';
import { UserEntity } from 'src/common/entites/01_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async createUser(userInfo: UserDto) {
    return this.userRepo.save(userInfo);
  }
}
