import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CreditModule } from './credit/credit.module';
import { EquivalenceModule } from './equivalence/equivalence.module';
import { PromotionModule } from './promotion/promotion.module';
import { TransactionModule } from './transaction/transaction.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { HttpErrorFilter } from './common/filter/http-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Validate the environment.
      validationSchema: Joi.object({
        // General environment.
        NODE_ENV: Joi.string().default('development'),
        // Application port and public port.
        APP_PROCESS_PORT: Joi.number().default(80),
        APP_PUBLIC_PORT: Joi.number().default(80),
        // Generic configuration.
        APP_SCHEMA: Joi.string().valid('http', 'https').default('http'),
        APP_HOST: Joi.string().hostname().default('localhost'),
        // Database Configuration.
        DB_HOST: Joi.string().hostname().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        DB_LOGGING: Joi.boolean().default(false),
        // Swagger configuration.
        SWAGGER_ENABLED: Joi.boolean().default(false),
        SWAGGER_USER: Joi.string().default('admin'),
        SWAGGER_PASSWORD: Joi.string().default('admin!'),
        // Front-End configuration.
        WEBAPP_URL: Joi.string().uri().default('https://valu.mx'),
        // JWT Secret.
        JWT_SECRET: Joi.string().min(10).default('JWTSecret123!'),
        JWT_EXPIRATION: Joi.string().default('300'),
        // Mail configuration.
        MAIL_FROM: Joi.string().email().default('valu@fetchbug.com'),
        MAIL_PROVIDER: Joi.string()
          .valid('AWS', 'MAILTRAP')
          .default('MAILTRAP'),
        MAILTRAP_USER: Joi.string().optional().default('95bb8e0c6109d9'),
        MAILTRAP_PASSWORD: Joi.string().optional().default('42ed060ccf2bef'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [resolve(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<boolean>('DB_LOGGING'),
        keepConnectionAlive: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CreditModule,
    EquivalenceModule,
    PromotionModule,
    TransactionModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
