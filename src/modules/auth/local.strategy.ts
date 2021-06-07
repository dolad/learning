import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Strategy } from 'passport-local';
import { loginEmployeeDto } from './dto/employee.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordFeild: 'password',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    const loginData: loginEmployeeDto = {
      email: email,
      password: password,
    };
    const user = await this.authService.validatedUser(loginData);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
