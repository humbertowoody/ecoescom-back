import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Extract data.
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = +new Date();
    const requestStart = format(new Date(), 'dd/MMM/yyyy:HH:mm:ss xx');

    // Pipe the observable.
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        Logger.log(
          `${request.ip} [${requestStart}] "${method} ${url}" ${
            response.statusCode
          } ${+Date.now() - now}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
