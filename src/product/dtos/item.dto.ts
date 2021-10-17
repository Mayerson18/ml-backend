import { IsBoolean, IsString } from "class-validator";
import { PriceDTO } from "./price.dto";

export class ItemDTO {
  @IsString()
  id: string;

  @IsString()
  title: string;

  price: PriceDTO;

  @IsString()
  picture: string;

  @IsString()
  condition: string;

  @IsBoolean()
  free_shipping: boolean;
}
