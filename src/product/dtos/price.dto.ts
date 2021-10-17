import { IsString, IsNumber } from "class-validator";

export class PriceDTO {
  @IsString()
  currency: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  decimals: number;
}