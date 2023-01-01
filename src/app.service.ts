import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async buildDatabase(): Promise<boolean> {
    return true;
  }
}
