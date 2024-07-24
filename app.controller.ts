import { Controller, Get, Render, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ResponseTimeInterceptor } from './interceptor';
import { AuthService } from './auth/auth.service';

@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  root(@Res() res: Response) {
    return res.redirect('/index');
  }

  @Get('/index')
  @Render('index.hbs')
  async index(@Res() res: Response) {
    const isAuthenticated = this.authService.getIsAuthenticated();
    return res.render('index.hbs', {
      isAuthenticated: isAuthenticated || false,
      responseTime: String(res.locals.responseTime),
    });
  }
  @Get('/registration')
  @Render('registration')
  registration(@Res() res: Response) {
    return res.render('registration.hbs', {
      isRegistration: true,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/play')
  @Render('play')
  play(@Res() res: Response) {
    return res.render('play.hbs', {
      isPlay: true,
    });
  }
}
