import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(
    userId: number,
    profileData: CreateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.save({
      ...profileData,
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('no user');
    }
    user.profile = profile;
    await this.userRepository.save(user);
    return profile;
  }

  async findOneById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new BadRequestException('no profile');
    }
    return profile;
  }

  async updateProfileById(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new BadRequestException('no profile');
    }
    profile.displayName = updateProfileDto.displayName;
    // 토이에서는 단순히 imageUrl이라고 표시함
    profile.imageUrl = updateProfileDto.imageUrl;
    profile.phoneNumber = updateProfileDto.phoneNumber;
    profile.role = updateProfileDto.role;
    return await this.profileRepository.save(profile);
  }

  async removeProfileById(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new BadRequestException('no profile');
    }
    return await this.profileRepository.remove(profile);
  }
}
