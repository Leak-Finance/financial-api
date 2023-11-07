import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "@app/vehicle-retail/domain/persistence/CurrencyRepository";
import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(@InjectRepository(Currency) private readonly repository: Repository<Currency>) {}

  async existsByName(name: string): Promise<boolean> {
    return (await this.repository.findOneBy({ name: name })) != null;
  }

  async findAll(): Promise<Array<Currency>> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Currency | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async findByName(name: string): Promise<Currency | null> {
    return await this.repository.findOneBy({ name: name });
  }

  async persist(currency: Currency): Promise<Currency> {
    return await this.repository.save(currency);
  }

  async remove(currency: Currency): Promise<void> {
    await this.repository.remove(currency);
  }
}
