import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyparser from 'body-parser';
import { Request } from 'express';
import * as basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { AppModule } from './app.module';

/**
 * EcoESCOM API
 */
async function bootstrap() {
  // Create the app.
  const app = await NestFactory.create(AppModule);

  // Load configuration service.
  const configService: ConfigService = app.get(ConfigService);

  // Set a global /api prefix.
  //app.setGlobalPrefix('v1');

  // Set limit for requests body size.
  app.use(bodyparser.json({ limit: '200mb' }));

  // Security.
  app.use((req: Request, res, next) => {
    if (/pdf/.test(req.originalUrl)) {
      helmet({ frameguard: false })(req, res, next);
    } else {
      helmet()(req, res, next);
    }
  });

  // CORS.
  app.enableCors();

  // Configure Swagger.
  if (configService.get<boolean>('SWAGGER_ENABLED')) {
    // Build the options.
    const options = new DocumentBuilder()
      .setTitle('ecoescom-api')
      .setDescription(
        'This is our Swagger definition for our API, in here you can look at all the endpoints available and the overall structure of the API. If you need more information dont hesitate to reach out to us.',
      )
      .setContact('EcoESCOM - Equipo 2', 'ecoescom.lat', 'api@ecoescom.lat')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag(
        'Health',
        'Endpoints referring to health information about the API',
      )
      .addTag('Generic', 'Generic endpoints')
      .addTag('Authentication', 'All of the Authentication routes available')
      .addTag('Users', 'All of the functionalities available for users')
      .addTag(
        'Transactions',
        'All of the functionalities available for transactions',
      )
      .addTag(
        'Promotions',
        'All of the functionalities available for promotions',
      )
      .addTag(
        'Equivalences',
        'All of the functionalities available for equivalences',
      )
      .addTag('Credits', 'All operations available for credits')
      .build();

    // Build the document.
    const document = SwaggerModule.createDocument(app, options);

    // Authentication for Swagger.
    const authOptions: basicAuth.BasicAuthMiddlewareOptions = {
      challenge: true,
      users: {},
    };

    // Dynamic setting of user.
    authOptions.users[configService.get<string>('SWAGGER_USER')] =
      configService.get<string>('SWAGGER_PASSWORD');

    // Auth for swagger check middleware.
    app.use('/docs', basicAuth(authOptions));

    // Initialize Swagger Module.
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
        layout: 'BaseLayout',
      },
    });
  }

  // Global configuration.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Start the server.
  await app.listen(configService.get<number>('APP_PROCESS_PORT'));

  Logger.log(
    `Server started on port ${configService.get<number>('APP_PROCESS_PORT')}`,
    'Bootstrap',
  );
}
bootstrap();
