import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Channel } from 'src/entities/channel.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'email', 'name', 'profileId'],
    });
    if (user) {
      return user;
    }
    throw new BadRequestException('no user');
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email });
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'name', 'profileId'],
    });
  }

  async deleteById(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException('no user');
    }
    await this.userRepository.delete(user);
  }

  async register(userData: CreateUserDto): Promise<User> {
    const { email, password, name } = userData;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.userRepository.create({
      email,
      password,
      name,
    });
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async updateUserPassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException('no user');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async isPasswordMatching(password: string, user: User): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async joinChannel(userId: number, channelId: number) {
    const channel = await this.channelRepository.findOne(channelId, {
      relations: ['users'],
    });
    const user = await this.userRepository.findOne(userId);
    channel.users.push(user);

    await this.channelRepository.save(channel);
  }

  async leaveChannel(userId: number, channelId: number) {
    const channel = await this.channelRepository.findOne(channelId, {
      relations: ['users'],
    });
    channel.users = channel.users.filter((user) => user.id !== userId);

    if (channel.users.length) {
      await this.channelRepository.save(channel);
    } else {
      await this.channelRepository.remove(channel);
    }
  }
}
