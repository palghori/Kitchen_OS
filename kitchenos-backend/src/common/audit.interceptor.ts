import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, ip, user } = req;

    return next.handle().pipe(
      tap(async () => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
          if (user && user.organizationId) {
             await this.prisma.auditLog.create({
               data: {
                 action: method,
                 resource: url,
                 details: body ? JSON.parse(JSON.stringify(body)) : {},
                 ipAddress: ip || 'unknown',
                 userId: user.sub,
                 organizationId: user.organizationId,
               }
             }).catch(console.error);
          }
        }
      }),
    );
  }
}
