import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    return next.handle().pipe(
      tap(async () => {
        if (method !== 'GET' && user && user.organizationId) {
          try {
             await this.prisma.auditLog.create({
              data: {
                userId: user.id || 'system',
                organizationId: user.organizationId,
                action: `${method} ${url}`,
                resource: url.split('/')[1] || 'unknown',
                resourceId: 'system',
                details: 'Action performed successfully'
              }
            });
          } catch (e) {
            console.error('Failed to write audit log', e);
          }
        }
      }),
    );
  }
}
