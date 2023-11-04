import {PasswordHashingService} from "@app/security/domain/services/PasswordHashingService";
import { hash, compare } from 'bcrypt';
import {Injectable} from "@nestjs/common";

@Injectable()
export class PasswordHashingServiceImpl implements PasswordHashingService {
  private static readonly salt: number = 11;

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hash(password: string): Promise<string> {
    return hash(password, PasswordHashingServiceImpl.salt);
  }
}