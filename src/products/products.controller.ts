import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { ProductsService } from './products.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    const response = this.productService.createProduct(body);

    if (!response) throw new InternalServerErrorException();

    return response;
  }

  @Get()
  getAllProducts() {
    return this.productService.findAll();
  }

  @Get('/search')
  searchProduct(@Query('q') q: string) {
    
    return this.productService.searchProduct(q)
  }

  @Get('/dump-test-data')
  dumpData() {
    return this.productService.dumpData();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.findOne(parseInt(id));
  }


  @Put('/:id')
  updateProduct (@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

}
