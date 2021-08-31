import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; 
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private connection: Connection
    ){}

    async register(userData: CreateUserDto): Promise<User>{   
        const {email, password, name, displayed_name}= userData
        const saltOrRounds = 10;
        const hashedPassword= await bcrypt.hash(password, saltOrRounds);
        const user= await this.userRepository.create({email, password, name, displayed_name});
        user.password= hashedPassword;
        return await this.userRepository.save(user);
    }
}
