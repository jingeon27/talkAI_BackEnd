import { Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';
import { IOAuthUser } from './interfaces/auth-service.interface';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/:social')
  @UseGuards(DynamicAuthGuard)
  loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }
}
