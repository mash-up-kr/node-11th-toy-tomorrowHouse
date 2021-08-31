import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';

@Controller('user')
@ApiTags('User API')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post("/register")
    @ApiOperation({summary: 'Create User API', description:'Create User'})
    @ApiCreatedResponse({description:'Create User', type: User})
    register(@Body() userData: CreateUserDto){
        return this.userService.register(userData);
    }
}
