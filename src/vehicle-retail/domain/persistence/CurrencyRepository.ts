import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";

export interface CurrencyRepository {
  findAll(): Promise<Array<Currency>>;
  findById(id: number): Promise<Currency | null>;
  findByName(name: string): Promise<Currency | null>;
  persist(currency: Currency): Promise<Currency>;
  remove(currency: Currency): Promise<void>;
  existsByName(name: string): Promise<boolean>;
}

export const CurrencyRepository = Symbol("CurrencyRepository");
