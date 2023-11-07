import {Injectable} from "@nestjs/common";
import { Currency } from "@app/vehicle-retail/domain/model/Currency.entity";
import { CreateCurrencyResource } from "../resource/currency/CreateCurrencyResource";
import { CurrencyResource } from "@app/vehicle-retail/interfaces/rest/resource/currency/CurrencyResource";

@Injectable()
export class CurrencyMapper {

  toModel(createCurrencyResource: CreateCurrencyResource) {
    return {
      id: undefined,
      name: createCurrencyResource.name,
      symbol: createCurrencyResource.symbol
    } as Currency;
  }

  toResource(currency: Currency) {
    return {
      id: currency.id,
      name: currency.name,
      symbol: currency.symbol,
    } as CurrencyResource;
  }

  toResourceArray(models: Array<Currency>) {
    return models.map(model => this.toResource(model));
  }
}