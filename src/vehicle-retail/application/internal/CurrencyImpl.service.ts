import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";
import { CurrencyRepository } from "@app/vehicle-retail/domain/persistence/CurrencyRepository";
import { CurrencyService } from "@app/vehicle-retail/domain/services/CurrencyService";
import { CurrencyResponse } from "@app/vehicle-retail/domain/services/communication/CurrencyResponse";
import { UpdateCurrencyResource } from "@app/vehicle-retail/interfaces/rest/resource/currency/UpdateVehicleBrandResource";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CurrencyImplService implements CurrencyService {
  constructor(
    @Inject(CurrencyRepository) private readonly currencyRepository: CurrencyRepository
  ) { }

  async create(currency: Currency): Promise<CurrencyResponse> {
    if (await this.currencyRepository.existsByName(currency.name)) {
      return new CurrencyResponse("There's an existing vehicle brand with the same name.");
    }

    const model = await this.currencyRepository.persist(currency);
    return new CurrencyResponse(model);
  }
  async getAll(): Promise<Array<Currency>>{
    return await this.currencyRepository.findAll();
  }
  async getById(id: number): Promise<CurrencyResponse> {
    const existingCurrency = await this.currencyRepository.findById(id);
    
    if (existingCurrency == null) {
      return new CurrencyResponse(`Currency with id ${id} not found.`);
    }

    return new CurrencyResponse(existingCurrency);
  }
  async delete(id: number): Promise<CurrencyResponse> {
    const existingCurrency = await this.currencyRepository.findById(id);
    
    if (existingCurrency == null) {
      return new CurrencyResponse(`Currency with id ${id} not found.`);
    }

    await this.currencyRepository.remove(existingCurrency);
  }
  async update(id: number, updateCurrencyResource: UpdateCurrencyResource): Promise<CurrencyResponse> {
    const existingCurrency = await this.currencyRepository.findById(id);
    
    if (existingCurrency == null) {
      return new CurrencyResponse(`Currency with id ${id} not found.`);
    }

    const existingCurrencyWithName = await this.currencyRepository.findByName(updateCurrencyResource.name);
    
    if (existingCurrencyWithName !== null && existingCurrencyWithName.id !== id) {
      return new CurrencyResponse(`There's an existing currency with the same name.`);
    }

    existingCurrency.name = updateCurrencyResource.name;
    existingCurrency.symbol = updateCurrencyResource.symbol;
    await this.currencyRepository.persist(existingCurrency);
    return new CurrencyResponse(existingCurrency);
  }
}