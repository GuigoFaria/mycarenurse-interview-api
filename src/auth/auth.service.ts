import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NursesService } from '../nurses/nurses.service';
import { Nurse } from '../nurses/entities/nurse.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly nursesService: NursesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateNurse(email: string, password: string): Promise<any> {
    const nurse = await this.nursesService.findByEmail(email);
    if (!nurse) throw new UnauthorizedException('Credenciais inválidas');

    const isMatch = await compare(password, nurse.password);
    if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');
    return { ...nurse, password: undefined };
  }

  login(nurse: Nurse) {
    const payload = { sub: nurse.id, email: nurse.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
