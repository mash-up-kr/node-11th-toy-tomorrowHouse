import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find Users API', description: 'Find users' })
  @ApiCreatedResponse({ description: 'Find users' })
  findUsers() {
    return this.userService.findAllUser();
  }

  @Get('/:email')
  @ApiOperation({ summary: 'Find User API', description: 'Find a user' })
  @ApiCreatedResponse({ description: 'Find a user', type: User })
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Delete('/:email')
  @ApiOperation({
    summary: 'Delete User',
    description: 'Delete user by user email',
  })
  @ApiCreatedResponse({
    description: 'Delete user by user email',
    type: 'void',
  })
  delete(@Param('email') email: string) {
    return this.userService.deleteByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create User API', description: 'Create User' })
  @ApiCreatedResponse({ description: 'Create User', type: User })
  register(@Body() userData: CreateUserDto) {
    return this.userService.register(userData);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update User API',
    description: 'Update displayed name of user',
  })
  @ApiCreatedResponse({
    description: 'Update displayed name of user',
    type: User,
  })
  updateDisplayedName(@Body() updateUserData: UpdateUserDto) {
    return this.userService.updateDisplayedNameByEmail(
      updateUserData.email,
      updateUserData.displayed_name,
    );
  }
}
