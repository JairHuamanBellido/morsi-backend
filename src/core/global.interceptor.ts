import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data.status && data.status >= 400) {
          context.switchToHttp().getResponse().status(data.status)
        }
        return data
      })
    );
  }
}
