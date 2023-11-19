import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises'

interface ProductPayload extends CreateProductDto {
  images: string;
}

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  createProduct(body: CreateProductDto) {
    body.images = JSON.stringify(body.images);

    const create = this.repo.create(body as ProductPayload);

    return this.repo.save(create);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findByWhere(whereObj: Partial<Product>) {
    return this.repo.findOne({ where: whereObj });
  }

  findAll() {
    return this.repo.find({});
  }

  searchProduct(term: string) {
    return this.repo
      .createQueryBuilder('product')
      .where('product.name LIKE :searchTerm', { searchTerm: `%${term}%` })
      .orWhere('product.description LIKE :searchTerm', {
        searchTerm: `%${term}%`,
      })
      .getMany();

  }

  async updateProduct(id: number, body: Partial<CreateProductDto>) {
    const product = await this.findOne(id);

    if (!product) throw new BadRequestException();

    const combineProduct = Object.assign(product, body);

    combineProduct.images = JSON.stringify(body.images);

    const create = this.repo.create(body as ProductPayload);

    return this.repo.save(create);
  }

  deleteProduct(id: number) {
    return this.repo.delete(id);
  }

  waitForTimeout(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }

  async dumpData () {
    const data: any = JSON.parse(await fs.readFile('./sample_data.json', 'utf-8'));
    
    for await (const obj of data) {
      
      let values: any = {
        name: obj.name,
        description: obj.description?.long || "Sample Description",
        price: 1000,
      }

      if (!values.name) continue;
      
      if (obj.images && obj.images.gallery && obj.images.gallery.length) {
        values.images = obj.images.gallery;
      } else if (obj.images && obj.images.icon) {
        values.images = [obj.images.icon]
      } else {
        values.images = ['https://docs.nestjs.com/assets/logo-small.svg']
      }

      await this.createProduct(values);
      await this.waitForTimeout(200)
      console.log(`Done ${values.name}`);
      
    }

    return 'all done'
  }
}
