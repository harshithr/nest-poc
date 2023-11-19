import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product as ProductEntity} from './product.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, User])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
