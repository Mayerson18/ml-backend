import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';
import { AUTHOR } from 'src/config';
import { AuthorDTO } from './author.dto';
import { ItemDTO } from './item.dto';

export class ProductResponseDTO {
  author: AuthorDTO;

  @IsString({ each: false })
  @IsArray()
  categories: string[];

  @IsArray()
  items: ItemDTO[];

}

export const getCategories = (data): string[] => {
  if (data.filters[0]) {
    return data.filters[0].values[0].path_from_root;
  }
  return []
}

export const formatData = (data): ProductResponseDTO => {
  const items: ItemDTO[] = data.results.map(item => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price.toFixed(0),
      decimals: item.price % 1
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  }));
  return {
    author: AUTHOR,
    categories: getCategories(data),
    items,
  }
}