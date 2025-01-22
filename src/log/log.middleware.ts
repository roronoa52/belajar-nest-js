import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger : Logger) {}
  use(req: Request, res: Response, next: () => void) {
    this.logger.debug(`Receive Request to ${req.url}`);
    next();
  }
}
