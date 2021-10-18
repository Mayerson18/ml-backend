import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { URL_API } from 'src/config';
import { mapDataProductById, mapDataProducts, ProductResponseDTO } from './dtos/product-response.dto';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  async getProducts(
    query: any,
  ): Promise<ProductResponseDTO | { statusText: string }> {
    const { q } = query;
    const searchEndpoint = `${URL_API}/sites/MLA/search?q=${q}&&limit=4`;
    const res = await this.httpService.get(searchEndpoint).toPromise();
    const { status, statusText, data } = res;
    if (status === HttpStatus.OK) {
      return mapDataProducts(data);
    }
    return { statusText };
  }

  async getProductById(
    id: string,
  ): Promise<ProductResponseDTO | { statusText: string }> {
    const detailEndpoint = `${URL_API}/items/${id}`;
    const itemDetailResponse = await this.httpService.get(detailEndpoint).toPromise();
    const { status, statusText, data } = itemDetailResponse;
    if (status === HttpStatus.OK) {
      const categoriesEndpoint = `${URL_API}/categories/${data.category_id}`;
      const descriptionEndpoint = `${detailEndpoint}/description`;
      const categoriesResponse = await this.httpService.get(categoriesEndpoint).toPromise();
      const descriptionResponse = await this.httpService.get(descriptionEndpoint).toPromise();
      const { data: fullCategory } = categoriesResponse;
      const { plain_text: description } = descriptionResponse.data;
      return mapDataProductById(
        data,
        description,
        fullCategory.path_from_root,
      );
    } else {
      return { statusText };
    }
  }
}
