import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): string {
    // You can add more complex logic to check database connections, external services, etc.
    return 'Server is online and healthy!';
  }
}
