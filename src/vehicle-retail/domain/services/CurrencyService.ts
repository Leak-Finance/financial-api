import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";
import { CurrencyResponse } from "@app/vehicle-retail/domain/services/communication/CurrencyResponse";
import { UpdateCurrencyResource } from "@app/vehicle-retail/interfaces/rest/resource/currency/UpdateVehicleBrandResource";

export interface CurrencyService {
  create(currency: Currency): Promise<CurrencyResponse>;
  getAll(): Promise<Array<Currency>>;
  getById(id: number): Promise<CurrencyResponse>;
  delete(id: number): Promise<CurrencyResponse>;
  update(id: number, updateCurrencyResource: UpdateCurrencyResource): Promise<CurrencyResponse>;
}

export const CurrencyService = Symbol("CurrencyService");
