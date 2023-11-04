import {Injectable} from "@nestjs/common";
import {VehicleBrand} from "@app/vehicle-retail/domain/model/VehicleBrand.entity";

@Injectable()
export class VehicleBrandMapper {

  toResource(vehicleBrand: VehicleBrand) {
    return {
      id: vehicleBrand.id,
      name: vehicleBrand.name
    } as VehicleBrand;
  }

  toResourceArray(models: Array<VehicleBrand>) {
    return models.map((model) => this.toResource(model));
  }
}