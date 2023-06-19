import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    // Extract data.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    try {
      // Form response.
      const errorResponse: string | object = exception.getResponse();

      // Check if object.
      if (errorResponse && typeof errorResponse === 'object') {
        // Create a new formatted error response.
        const formattedErrorResponse: any = {
          ...errorResponse,
          timestamp: new Date(),
          version: 'v1',
        };

        // Send the response.
        response.status(exception.getStatus()).json(formattedErrorResponse);
      } else {
        // Send object | string as is.
        response.status(exception.getStatus()).json(exception.getResponse());
      }

      // Log the error.
      Logger.error(
        `Error detected during execution with status: ${exception.getStatus()}`,
      );
      Logger.log(exception.getResponse());
    } catch (error) {
      // Log the error.
      Logger.error(`Error: ${error}`);
      Logger.log(error);

      // Log the exception.
      Logger.error(`Exception: ${exception}`);
      Logger.log(exception);

      // Send a 500 response.
      response.status(500).json({
        statusCode: 500,
        message:
          exception.message ||
          exception.name ||
          'Unexpected Internal Server Error',
        timestamp: new Date(),
        version: 'v1',
      });
    }
  }
}
