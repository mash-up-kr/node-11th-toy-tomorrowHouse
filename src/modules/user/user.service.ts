import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Channel } from 'src/entities/channel.entity';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'email', 'name'],
      relations: ['profile'],
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
      select: ['id', 'email', 'name'],
      relations: ['profile'],
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
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
    const user = await this.userRepository.create({ ...userData });
    user.password = hashedPassword;
    const profile = new Profile();
    user.profile = profile;
    profile.displayName = user.name;
    await this.userRepository.save(user);
    await this.profileRepository.save(profile);
    return user;
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
