import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { URL_API } from 'src/config';
import { formatData, ProductResponseDTO } from './dtos/product-response.dto';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  async getProducts(query: any): Promise<ProductResponseDTO | {statusText: string}> {
    console.log(`query`, query);
    const {q} = query;
    const searchEndpoint = `${URL_API}/sites/MLA/search?q=${q}&&limit=4`;
    const res = await this.httpService.get(searchEndpoint).toPromise();
    const {status, statusText, data,} = res;
    if (status === HttpStatus.OK) {
      return formatData(data)
    }
    return {statusText};
  }
}
