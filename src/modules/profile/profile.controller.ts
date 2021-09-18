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

@Controller('')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('user/:userid/profile')
  createProfile(
    @Param('userid') id: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(id, createProfileDto);
  }

  @Get('profile/:profileid')
  findProfile(@Param('profileid') id: string) {
    return this.profileService.findOneById(+id);
  }

  @Patch('profile/:profileid')
  updateProfile(
    @Param('profileid') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfileById(+id, updateProfileDto);
  }

  @Delete('profile/:profileid')
  removeProfile(@Param('profileid') id: string) {
    return this.profileService.removeProfileById(+id);
  }
}
