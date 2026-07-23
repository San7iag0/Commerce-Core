import { Injectable, UnauthorizedException } from '@nestjs/common';
import { phaseOneStore } from '../common/phase-one-store';

export interface LoginRequest {
  email: string;
}

@Injectable()
export class AuthService {
  login(request: LoginRequest) {
    const user = phaseOneStore.users.find(
      (candidate) => candidate.email === request.email && candidate.isActive,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid Phase 1 user.');
    }

    return {
      user,
      accessToken: `phase1-token:${user.id}`,
    };
  }

  profile(userId = 'user_admin') {
    return phaseOneStore.users.find((user) => user.id === userId) ?? phaseOneStore.users[0];
  }
}
