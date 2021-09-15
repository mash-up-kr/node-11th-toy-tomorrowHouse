import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user_email: string, pass: string): Promise<User> {
    const user = await this.userService.findUserByEmail(user_email);
    const isPasswordMatching = await this.userService.isPasswordMatching(
      pass,
      user,
    );
    if (user && isPasswordMatching) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
