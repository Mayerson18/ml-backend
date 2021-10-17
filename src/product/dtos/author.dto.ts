import { IsString } from "class-validator";

export class AuthorDTO {
  @IsString()
  name: string;

  @IsString()
  lastname: string;
}
