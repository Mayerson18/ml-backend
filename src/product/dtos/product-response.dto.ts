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

  @IsOptional()
  @IsArray()
  items?: ItemDTO[];

  @IsOptional()
  @IsArray()
  item?: ItemDTO;
}

export const getCategories = (data): string[] => {
  if (data.filters[0]) {
    return data.filters[0].values[0].path_from_root.map(c => c.name);
  }
  return []
}

const generateItem = item => ({
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
})

export const mapDataProducts = (data): ProductResponseDTO => {
  const items: ItemDTO[] = data.results.map(item => generateItem(item));
  const categories = getCategories(data);
  return {
    author: AUTHOR,
    categories,
    items,
  }
}

export const mapDataProductById = (
  data: any,
  description: string,
  categories
): ProductResponseDTO => {
  const item: ItemDTO = generateItem(data);
  item.description = description;
  item.sold_quantity = data.sold_quantity;
  return {
    author: AUTHOR,
    categories: categories.map(c => c.name),
    item,
  }
}
