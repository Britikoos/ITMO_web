import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { FinancialTransactionsModule } from './financial-transactions/financial-transactions.module';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ResponseTimeInterceptor } from './interceptor';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
    UsersModule,
    FinancialTransactionsModule,
    TableModule,
    AuthModule,
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, ResponseTimeInterceptor],
})
export class AppModule {}
