import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Profile } from 'src/entities/profile.entity';

@ApiTags('Profile API')
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: '프로필 만들기' })
  @ApiParam({ name: 'userId' })
  @ApiResponse({ type: Profile, description: '프로필 만들었어용' })
  @Post('user/:userid/profile')
  createProfile(
    @Param('userid') id: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(id, createProfileDto);
  }

  @ApiOperation({ summary: '프로필 정보 가져오기' })
  @Get('profile/:profileid')
  findProfile(@Param('profileid') id: string) {
    return this.profileService.findOneById(+id);
  }

  @ApiOperation({ summary: '프로필 정보 수정하기' })
  @Patch('profile/:profileid')
  updateProfile(
    @Param('profileid') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfileById(+id, updateProfileDto);
  }

  @ApiOperation({ summary: '프로필 정보 삭제하기' })
  @Delete('profile/:profileid')
  removeProfile(@Param('profileid') id: string) {
    return this.profileService.removeProfileById(+id);
  }
}
