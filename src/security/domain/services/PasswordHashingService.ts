
export interface PasswordHashingService {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

export const PasswordHashingService = Symbol("PasswordHashingService");